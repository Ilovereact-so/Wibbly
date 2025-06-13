import { json } from "react-router-dom";

async function fetchWithAuth({url, method = 'GET', headers = {}, body = null, credentials = "omit" ,  retry = false}) {
    let accessToken = localStorage.getItem('at');
    const deviceId = localStorage.getItem('d_id');
    console.log(url, credentials)
    // Tworzymy nagłówki z access tokenem i device_id
    const requestHeaders = {
        'content-type':'application/json',
        'authorization': accessToken,
        'deviceId': deviceId,
        ...headers
    };

    try {
        const response = await fetch(url, {
            method,
            headers: requestHeaders,
            body,
            credentials
        });

        if (response.ok) {
            // Jeśli odpowiedź jest poprawna, zwracamy dane
            console.log("f_response",response)
            return await response.json();
        } 
        else if (response.status === 403) {
            // Token wygasł, spróbujemy odświeżyć
            console.log('Token expired, attempting to refresh...');

            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
                // Zapisujemy nowy token w sessionStorage
                localStorage.setItem('at', newAccessToken);

                // Powtarzamy żądanie z nowym access tokenem
                requestHeaders['authorization'] = newAccessToken;
                const retryResponse = await fetch(url, {
                    method,
                    headers: requestHeaders,
                    body,
                    credentials
                });

                if (retryResponse.ok) {
                    return await retryResponse.json();
                } else {
                    throw new Error('Unauthorized after token refresh');
                }
            } else {
                throw new Error('Failed to refresh token'); // Trzeba zrobic crear localStorage z wadliwym access_tokenem i device_id
            }
        }
        else if (response.status === 401){
            return false
        } else {
            //console.log(response)
            throw new Error('Request failed');
        }
    }catch (error) {
        console.log("AuthRequest:", error)
        if (error instanceof TypeError && !retry) {
            console.warn("Ponawianie żądania ze względu na błąd CORS...");
            console.log(retry)
            // Dodaj krótką pauzę, aby dać czas serwerowi na dostosowanie
            await new Promise(resolve => setTimeout(resolve, 1000));
            return fetchWithAuth({url, method, headers, credentials, body , retry:true});  // Ponownie wysyła żądanie, ale już bez ponawiania przy kolejnym błędzie
        }else{

        
        //console.error('Invalid token:', error);
            const data =  await securyCheck();
            if(data == null){
            console.error('Invalid token:', error);
            alert('Session expired. Please log in again.');
            return null
            }
            localStorage.setItem('at', data);
            if (data) {
                // Zapisujemy nowy token w sessionStorage
                localStorage.setItem('at', data);

                // Powtarzamy żądanie z nowym access tokenem
                requestHeaders['authorization'] = data;
                const retryResponse = await fetch(url, {
                    method,
                    headers: requestHeaders,
                    body,
                    credentials
                });

                if (retryResponse.ok) {
                    return await retryResponse.json();
                } else if (retryResponse.status === 401){
                    return false
                } else {
                    //console.log(response)
                    throw new Error('Unauthorized after token refresh');
                }
            } else {
                throw new Error('Failed to refresh token');
            }
        }
      }
}

async function refreshAccessToken() {
    const deviceId = localStorage.getItem('d_id');


    try {
        const response = await fetch(`${process.env.REACT_APP_TUNNEL_URL}/api/refresh-accesstoken`, {
            method: 'GET',
            credentials: 'include', // Wymusza przesyłanie ciasteczek
            headers: {
                'Content-Type': 'application/json',
                'deviceId': deviceId//dodać w routes by dodawało automatycznie refresh_token
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data.access_token;
        } else {
            throw new Error('Failed to refresh token');
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
        return null;
    }
}
async function securyCheck() {
    const deviceId = localStorage.getItem('d_id');
    try {
        const response = await fetch(`${process.env.REACT_APP_TUNNEL_URL}/api/securycheck`, {
            method: 'GET',
            credentials: 'include', // Wymusza przesyłanie ciasteczek
            headers: {
                'Content-Type': 'application/json',
                'deviceId': deviceId//dodać w routes by dodawało automatycznie refresh_token
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data.access_token;
        } else {
            throw new Error('Failed to localize user');
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
async function checkCookie(){
    const deviceId = localStorage.getItem('d_id');
    try {
        const response = await fetch(`${process.env.REACT_APP_TUNNEL_URL}/api/checkcookie`, {
            credentials: 'include', // Wymusza przesyłanie ciasteczek
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'deviceId': deviceId//dodać w routes by dodawało automatycznie refresh_token
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            return data;
        } else {
            throw new Error('Failed to localize user');
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export {refreshAccessToken, fetchWithAuth, securyCheck, checkCookie}