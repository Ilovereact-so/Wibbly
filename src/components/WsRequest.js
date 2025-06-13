class WsRequests {
    constructor() {
        this.ws = null; // Połączenie WebSocket
        this.isConnected = false; // Flaga sprawdzająca, czy połączenie jest otwarte
        this.listeners = []; // Lista nasłuchiwaczy na wiadomości
        this.messageQueue = []; // Kolejka wiadomości do wysłania, jeśli połączenie nie jest jeszcze nawiązane
    }

    // Funkcja do łączenia z WebSocket
    async connect() {
        return new Promise((resolve, reject) => {
            if (this.isConnected) return resolve(this.ws); // Jeśli połączenie jest już nawiązane, nie nawiązuj ponownie

            const at = localStorage.getItem('at');
            const url_ws = (process.env.REACT_APP_TUNNEL_URL).replace("http://", "");
            this.ws = new WebSocket(`ws://${url_ws}?token=${at}`);

            this.ws.onopen = () => {
                this.isConnected = true;
                console.log('Połączono z serwerem WebSocket!');
                
                // Po otwarciu połączenia, wyślij wszystkie wiadomości z kolejki
                this.messageQueue.forEach((message) => {
                    this.ws.send(message);
                });
                this.messageQueue = []; // Opróżnij kolejkę
                resolve(this.ws); // Połączono, zwróć WebSocket
            };

            this.ws.onmessage = (event) => {
                let data;
                try {
                    data = JSON.parse(event.data);
                } catch (error) {
                    console.error("Odebrano nieprawidłową wiadomość:", event.data);
                    return;
                }

                // Przekaż wiadomość do wszystkich nasłuchiwaczy
                this.listeners.forEach((listener) => listener(data));
            };

            this.ws.onclose = () => {
                this.isConnected = false;
                console.log('Połączenie WebSocket zostało zamknięte');
            };

            this.ws.onerror = (error) => {
                console.error('Błąd WebSocket:', error);
                reject(error);
            };
        });
    }

    // Funkcja do wysyłania wiadomości
    sendMessage(message) {
        if (this.isConnected) {
            if (this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(JSON.stringify(message)); // Jeśli połączenie jest otwarte, wyślij wiadomość
            }
        } else {
            this.messageQueue.push(JSON.stringify(message)); // W przeciwnym razie dodaj wiadomość do kolejki
        }
    }

    // Funkcja do subskrypcji na wiadomości (listener)
    addListener(listener) {
        this.listeners.push(listener);
    }

    // Funkcja do usuwania nasłuchiwacza
    removeListener(listener) {
        this.listeners = this.listeners.filter((l) => l !== listener);
    }

    // Funkcja do zamknięcia połączenia WebSocket
    close() {
        if (this.ws) {
            this.ws.close();
            this.isConnected = false;
        }
    }

    subscribeToSettingsUpdates(callback) {
        const handleMessage = (data) => {
            if (data?.type === "settingsView") {
                callback(data?.data); // Wywołaj callback z nowymi danymi
            }
        };

        this.addListener(handleMessage);

        // Zwróć funkcję do odsubskrybowania
        return () => {
            this.removeListener(handleMessage);
        };
    }

    // Funkcja do pobrania danych użytkownika
    async getDataUser() {
        // Upewnij się, że połączenie jest otwarte
        await this.connect();

        return new Promise((resolve, reject) => {
            // Dodaj nasłuchiwacza dla tego zapytania
            const handleMessage = (data) => {
                if (data?.type === 'userData') {
                    this.removeListener(handleMessage); // Usuń nasłuchiwacza po otrzymaniu odpowiedzi
                    resolve(data?.data); // Zwróć dane użytkownika
                }
            };

            // Zarejestruj nasłuchiwacza
            this.addListener(handleMessage);

            // Wyślij zapytanie o dane użytkownika
            this.sendMessage({ type: 'ViewUserData' });
        });
    }
    // Pieerwsze połączenie
    async Auth(){
        await this.connect();

        return new Promise((resolve,reject)=>{
            const handleMessage =(data)=>{
                if(data?.type === 'connectionStatus'){
                    this.removeListener(handleMessage);
                    resolve(data?.data)
                }
            };

            this.addListener(handleMessage);

            this.sendMessage({type: 'Auth'})
        })
    }
    async setSettings(e){
        await this.connect();

        return new Promise((resolve, reject)=>{
            const handleMessage = (data)=>{
                if(data?.type === "settingStatus"){
                    this.removeListener(handleMessage);
                    resolve(data?.message)
                }
            };
            this.addListener(handleMessage);
            this.sendMessage({type: 'setSettings', data:e})
        })
    }
    async getSettings(){
        await this.connect();

        return new Promise((resolve, reject)=>{
            const handleMessage = (data)=>{
                if(data?.type === "settingsView"){
                    this.removeListener(handleMessage);
                    resolve(data?.data)
                }
            };
            this.addListener(handleMessage);
            this.sendMessage({type:'getSettings'})
        })
    }
    async getDSettings(){
        await this.connect();

        return new Promise((resolve, reject)=>{
            const handleMessage = (data)=>{
                if(data?.type === "defaultSView"){
                    this.removeListener(handleMessage);
                    resolve(data?.data)
                }
            };
            this.addListener(handleMessage);
            this.sendMessage({type:'getDSettings'})
        })
    }
}

module.exports = new WsRequests();
