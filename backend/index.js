const express = require('express');
const router = require('./routes');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const websocketHandler = require('./ws/websocketHandler');  // Import logiki WebSocket
const cookieParser = require('cookie-parser');
const localtunnel = require('localtunnel');


const app = express();
app.use(express.json());
app.use(cookieParser()); // Middleware do obsługi ciasteczek


const corsOptions = {
    origin: "http://192.168.0.102:3000", // pozwól na żądania z tego origin
    methods: ['GET', 'POST','OPTIONS'], // dozwolone metody
    allowedHeaders: ['authorization', 'Content-Type', 'deviceId','skip_zrok_interstitial'], // dozwolone nagłówki
    credentials: true,
};


// app.use((req, res) => {
//     console.log(`${req.method} ${req.url} ${req.headers} - ${new Date().toISOString()}`);
// });

if(process.env.NODE_ENV !== 'production'){
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "http://192.168.0.102:3000"); // Dopuszczaj żądania z restninja.io
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Dozwolone metody
    res.header('Access-Control-Allow-Headers', 'Content-Type, skip_zrok_interstitial, authorization, deviceId'); // Dozwolone nagłówki
    res.header('Access-Control-Allow-Credentials', 'true'); // Jeśli wymagana jest obsługa ciasteczek
    //console.log(`${req.method} ${req.url} ${req.headers} - ${new Date().toISOString()}`);
    // Obsługa preflight request
    if (req.method === 'OPTIONS') {
        return res.status(204).send(); // Zwróć "No Content" dla OPTIONS
    }

    next();
});
}
app.use(cors(corsOptions));


// app.options('*', (req, res) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');  // lub URL tunelu Ngrok
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'authorization, Content-Type','device_id');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.sendStatus(200);  // Wysyła poprawną odpowiedź dla zapytania OPTIONS
// });
app.use(router);
// Tworzymy serwer HTTP
const server = http.createServer(app);

// Tworzymy serwer WebSocket
const wss = new WebSocket.Server({ server });

// Podłączamy logikę WebSocket
websocketHandler(wss);

// Uruchamiamy serwer HTTP i WebSocket
server.listen(3003,'127.0.0.1', async () => {
    console.log('Server listening on port 3003 on all network interfaces');
    // const tunnel = await localtunnel(3003, { subdomain: 'createup-devlocal',local_host:'192.168.0.105' });
    // console.log(`LocalTunnel running at: ${tunnel.url}`);

    // // Obsługa zdarzenia zakończenia
    // tunnel.on('close', () => {
    //     console.log('Tunnel closed');
    // });
});
