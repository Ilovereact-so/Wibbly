import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import { useLocation } from 'react-router-dom';
import { isExpired, decodeToken } from "react-jwt";
import { checkCookie, refreshAccessToken, securyCheck } from './AuthRequest';
import WsRequest from './WsRequest';


const Auth = async(option, retry = false, at = localStorage.getItem('at'), d_id = localStorage.getItem('d_id')) => {
  
  if(option === "firstAuth"){

    console.log('Access Token:', at);
    console.log('Device ID:', d_id);

    
    try {
      const myDecodedToken = decodeToken(at);
      console.log(myDecodedToken);

      // Sprawdź, czy token nie wymaga rt_id
      if (myDecodedToken?.rt_id == null) {
          const response = await fetch(`${process.env.REACT_APP_TUNNEL_URL}/api/fauthorizeuser`, {
              method: 'GET',
              credentials: 'include',
              headers: {
                  'authorization': at,
                  'deviceId': d_id
              }
          });

          if (response.ok) {
              const data = await response.json();
              console.log(data);
              localStorage.setItem('at', data?.access_token);
              return true;
          } else {
              throw new Error('Unauthorized');
          }
      } else {
          console.log("Token zawiera rt_id, autoryzacja nie jest wymagana.");
          return true;
      }
  } catch (error) {
      console.error("Wystąpił błąd:", error);

      // Sprawdź, czy błąd dotyczy CORS i czy to pierwsza próba
      if (error instanceof TypeError && !retry) {
          console.warn("Ponawianie żądania ze względu na błąd CORS...");

          // Dodaj krótką pauzę, aby dać czas serwerowi na dostosowanie
          await new Promise(resolve => setTimeout(resolve, 1000));
          return Auth("firstAuth" , true);  // Ponownie wysyła żądanie, ale już bez ponawiania przy kolejnym błędzie
      }

      return false;
  }
      
  }else if(option === "clasicAuth"){
    console.log("clasicAuth")
    console.log('at', at)
    const G_at = await Predata(at, d_id)
    if(!G_at){
      return false
    }
    try{
      
      const myDecodedToken = decodeToken(G_at);
      const currentTime = Math.floor(Date.now() / 1000);
      if (myDecodedToken.exp < currentTime) {
        console.log('Token has expired or failed');
        const newAccessToken =  await refreshAccessToken();
        if (newAccessToken) {
          // Zapisujemy nowy token w sessionStorage
          localStorage.setItem('at', newAccessToken);
          const auth =  await WsRequest.Auth()
          console.log(auth)
          if (auth  === 'authorized') {
              console.log('Połączenie autoryzowane.');
              if(!d_id){
                try{
                  const myDecodedToken = decodeToken(G_at);
                  localStorage.setItem("d_id",myDecodedToken.device_id) 
                }
                catch(err){
                  console.log(err)
                }
              }
              return true
          } else if (auth === 'unauthorized') {
            try{
              const data =  await securyCheck();
              if(data == null){
                console.log("faled serurity check")
                //alert('Session expired. Please log in again.');
                localStorage.removeItem('at');
                localStorage.removeItem('d_id');
                return false;
              }else{
                localStorage.setItem('at', data);
                return true
              }
              
            }catch(err){
              console.log("nig",err)
            }
          }
        }else{
          return false
        }
      }else{


        const auth =  await WsRequest.Auth()
        console.log(auth)
        if (auth  === 'authorized') {
            console.log('Połączenie autoryzowane.');
            if(!d_id){
              try{
                const myDecodedToken = decodeToken(G_at);
                localStorage.setItem("d_id",myDecodedToken.device_id) 
              }
              catch(err){
                console.log(err)
              }
            }
            return true
        } else if (auth === 'unauthorized') {
          try{
            const data =  await securyCheck();
            if(data == null){
              console.log("faled serurity check")
              //alert('Session expired. Please log in again.');
              localStorage.removeItem('at');
              localStorage.removeItem('d_id');
              return false;
            }else{
              localStorage.setItem('at', data);
              return true
            }
          }catch(err){
            console.log("nig",err)
          }
        }
        // const url_ws = (process.env.REACT_APP_TUNNEL_URL).replace("http://","")
        // const ws = new WebSocket(`ws://${url_ws}?token=${at}`)

        // console.log("cwl")
        // await fetch(`https://createupdevlocal.loca.lt/api/setcookie`, {
        //   method: 'GET',
        //   credentials: 'include'  // Wymusza dołączenie ciasteczek w żądaniu
        // });
    
        

        // return new Promise((resolve,reject)=>{
        //   console.log(ws.readyState)
          
          
        //   ws.onopen=()=>{
        //     ws.send(JSON.stringify({ type: 'Auth' }));
        //   }
        //   ws.onmessage = (event)=>{
      
        //     let data;
        //     try {
        //         data = JSON.parse(event.data);
        //     } catch (error) {
        //         console.log("Odebrano wiadomość tekstową:", event.data);
        //         return;  // Zakończ działanie, jeśli nie jest JSON-em
        //     }
        //     console.log(data)
        //     if (data?.type === "connectionStatus" && data.status === 'authorized') {
        //         console.log('Połączenie autoryzowane.');
        //         resolve(true)
        //     } else if (data.type === 'connectionStatus' && data.status === 'unauthorized') {
        //         console.log('Nieautoryzowany token.');
        //         ws.close(); // zamknij połączenie
        //         resolve(false)
        //   }else{
        //     ws.close();
        //     resolve(false)
        //   }
        //   }
        //   ws.onerror = (error) => {
        //       console.error('Błąd WebSocket:', error);
        //       ws.close();
        //       reject(error); // Zwróć błąd, jeśli wystąpił problem z połączeniem
        //   };
          

        // })
        
        // if (ws.readyState === WebSocket.OPEN) {
        //   console.log('Połączenie WebSocket jest aktywne.');
        // } else {
        //     console.log('Połączenie WebSocket nie jest aktywne.');
        // }
      }
    

    }catch (error) {
      console.log("logged out user",G_at)
      console.error('Invalid token:', error);
    }
  }else{
    console.log("Błędny zapis deklaracji Auth")
  }
  
}

 const Predata = async (at, d_id)=>{
  try{
    if(!at && !d_id){
      return false
    }else if(!at && d_id){
      try{
        const data =  await securyCheck();
        if(data == null){
          console.log("faled serurity check")
          //alert('Session expired. Please log in again.');
          localStorage.removeItem('at');
          localStorage.removeItem('d_id');
          return false;
        }else{
          localStorage.setItem('at', data);
          return data
        }
      }catch(err){
        console.log("nig",err)
      }
    }
    else {
      return at
    }
  }catch(err){
    console.log(err)
  }
 }

export default Auth