const db = require('../db/db');
const jwt = require('jwt-simple');
const secretKey = 'kurwakurwaKondzioCwelkurwakurwa';

module.exports = (wss) => {
    wss.on('connection', (ws, req) => {
        const token = new URLSearchParams(req.url.split('?')[1]).get('token');

        if (!token) {
            console.log("try ws")
            ws.close(4001, 'Brak tokenu autoryzacyjnego');
            return;
        }

        const user = verifyToken(token);
        if (!user) {
            ws.send(JSON.stringify({ type: 'connectionStatus',  data: 'unauthorized', message: 'Nieprawidłowy token' }));
            ws.close();
            return;
        }

        ws.userId = user.user_id;  // Ustaw użytkownika jako część ws dla przyszłych akcji
        
        // Funkcja do obsługi ustawień
        ws.on('message', async (message) => {
            if(ws.authorizedToken){
                if(ws.authorizedToken != token){
                    ws.send(JSON.stringify({ type: 'connectionStatus',  data: 'unauthorized', message: 'Nieprawidłowy token' }));
                    ws.close();
                    return;
                }
            }else{
                const [tokenIsRight] = await db('oauth_access_tokens').where({ user_id: ws.userId, access_token:token });
                console.log(tokenIsRight)
                if(!tokenIsRight){
                    ws.send(JSON.stringify({ type: 'connectionStatus',  data: 'unauthorized', message: 'Nieprawidłowy token' }));
                    ws.close();
                    return;
                }else{
                    ws.authorizedToken = tokenIsRight?.access_token
                }
            }
            try {
                const data = JSON.parse(message);
                switch (data.type) {
                    case 'Auth':
                        await handleAuth(ws);
                        break;
                    case 'getSettings':
                        await handleGetSettings(ws);
                        break;
                    case 'getDSettings':
                        await handleGetDSettings(ws);
                        break;
                    case 'ViewUserData':
                        await handleViewUserData(ws);
                        break;
                    case 'setSettings':
                        await handleSetSettings(ws, data?.data);
                        break;
                    default:
                        ws.send(JSON.stringify({ type: 'error', message: 'Nieznany typ wiadomości' }));
                }
            } catch (error) {
                console.error('Błąd:', error);
                ws.send(JSON.stringify({ type: 'error', message: 'Błąd w obsłudze wiadomości' }));
            }
        });
    });
};

function verifyToken(token) {
    try {
        const trytoken = jwt.decode(token, secretKey, false, 'HS512');
        return trytoken
    } catch (error) {
        //console.error('Błąd dekodowania tokenu JWT:', error);
        return;
    }
}

async function handleAuth(ws) {
    if(ws.userId != null){
        //console.log(ws.userId)
        ws.send(JSON.stringify({ type: 'connectionStatus',  data: 'authorized', message: 'Prawidłowy token' }));

    }
}

async function handleViewUserData(ws) {
    try {
        // Jeśli dane użytkownika są już w pamięci, wyślij je
        if (ws.userData) {
            console.log('Wysyłanie danych użytkownika z pamięci');
            ws.send(JSON.stringify({
                type: 'userData',
                data: ws.userData,
                message: 'Dane użytkownika z pamięci',
            }));
            return;
        }

        // Pobranie danych z bazy danych, jeśli nie ma ich w pamięci
        const [dbUserData] = await db('users').where({ id: ws.userId });

        // Przygotowanie danych użytkownika
        const userData = {
            username: dbUserData?.username,
            email: dbUserData?.email,
        };

        // Przechowywanie danych w WebSocket dla tej sesji
        ws.userData = userData;

        // Wysyłanie danych do klienta
        if (ws.readyState === 1) {
            console.log('Pobranie i wysłanie danych użytkownika z bazy');
            ws.send(JSON.stringify({
                type: 'userData',
                data: userData,
                message: 'Dane użytkownika',
            }));
        }
    } catch (error) {
        console.error('Błąd podczas pobierania danych użytkownika:', error);
        ws.send(JSON.stringify({
            type: 'error',
            message: 'Błąd podczas pobierania danych użytkownika',
        }));
    }
}


async function handleSetSettings(ws, data) {
    try {
        const settings = JSON.parse(data);
        console.log(settings, "settings")
        if(!ws.defaultList){
            const defaultList = await db('settings_list')
            console.log(defaultList)
            ws.defaultList = defaultList
        }

            for (const element of settings){
                //ws.defaultList.find((element)=> element.index === )
                if(ws.defaultList.find((item)=> item.id === element?.id)?.default === element.state){
                    console.log(ws.defaultList.find((item)=> item.id === element?.id)?.default === element.state)
                    const result = await db('users_settings').where({user_id:ws.userId, settings_id: element?.id})
                    console.log(result, "result")
                    if(result){
                    await db('users_settings').where({user_id:ws.userId, settings_id: element?.id}).del()
                    }else{
                        return;
                    }
                }else{
                    console.log(ws.defaultList.find((item)=> item.id === element?.id)?.default, element)
                    await db('users_settings').insert({user_id:ws.userId, settings_id: element?.id, settings_value: element.state})
                }
            
        }

        ws.send(JSON.stringify({ type: 'settingStatus', message: 'Ustawienia zaktualizowane' }));
        handleGetSettings(ws)
    } catch (error) {
        console.error('Błąd podczas aktualizacji ustawień:', error);
        ws.send(JSON.stringify({ type: 'error', message: 'Błąd podczas aktualizacji ustawień' }));
    }
}

async function handleGetDSettings(ws){
    try {
        // Użyj userId przypisanego do instancji WebSocket podczas nawiązywania połączenia
        if(!ws.settings_list){
            const dbDSettings = await db('settings_list')
            ws.settings_list = dbDSettings
            ws.send(JSON.stringify({ type: 'defaultSView', data: dbDSettings }));
            return;
        }

        ws.send(JSON.stringify({ type: 'defaultSView', data: ws.settings_list }));
    } catch (error) {
        console.error('Błąd podczas pobierania ustawień:', error);
        ws.send(JSON.stringify({ type: 'error', message: 'Błąd podczas pobierania ustawień' }));
    } 
}

async function handleGetSettings(ws) {
    try {
        // Użyj userId przypisanego do instancji WebSocket podczas nawiązywania połączenia
        const dbSettings = await db('users_settings').where({ user_id: ws.userId });
        console.log("pobieranie ustawień")
        if(dbSettings.length === 0){
            console.log(dbSettings)
            ws.send(JSON.stringify({ type: 'settingsView', data: null }));
            return;
        }
        const settings = dbSettings.map(item => ({
            settings_id: item.settings_id,
            settings_value: item.settings_value,
        }));

        ws.send(JSON.stringify({ type: 'settingsView', data: settings }));
    } catch (error) {
        console.error('Błąd podczas pobierania ustawień:', error);
        ws.send(JSON.stringify({ type: 'error', message: 'Błąd podczas pobierania ustawień' }));
    } 
}