<p align="center">
  <img src="https://wibbly.pl/assets/logo_wibbly.svg" alt="Logo Wibbly" width="150"/>
</p>

# 🌐 Wibbly
Strona internetowa mająca na celu ukazać możliwości developerskie, portfolio oraz konfigurator tworzenia designu stron.

## 🧪 Demo online *(status: coming soon)*

Projekt dostępny pod adresem:  
🔗 [https://konfigurator-3d.wibbly.pl](https://konfigurator-3d.wibbly.pl)

## 🚀 Funkcje

- Personalizacja kolorów — **zmiana kolorów w czasie rzeczywistym**  
  <details>
    <summary>Kliknij, aby zobaczyć demo</summary>

    <br>

    ![GIF](https://github.com/Ilovereact-so/Wibbly/blob/main/src/assets/Funkcja1.gif?raw=true)

  </details>

- Tryb wyświetlania — `white mode | dark mode | system`
- Responsywny interfejs — działa na desktopach i urządzeniach mobilnych
- Rozbudowane UI/UX

- Scroll animations i przesuwanie sekcji Menu (`Framer Motion`)
  <details>
    <summary>Kliknij, aby zobaczyć demo</summary>

    <br>

    ![GIF](https://github.com/Ilovereact-so/Wibbly/blob/main/src/assets/Funkcja2.gif?raw=true)

  </details>

- Rejestracja użytkowników / OAuth
- Rozbudowany panel użytkownika
- Elementy stylistyczne 3D:
  ```
  1. Wyszukiwanie fraz (#support)
  2. Slider z dynamiczną liczbą elementów — gotowy na nowe konfiguracje
  3. Interaktywne ustawienia konta i zmiana danych logowania (WebSocket)
  ```

## 🧰 Stack technologiczny
- **Frontend**: React.js
- **3D**: Three.js, @react-three/fiber, @react-three/drei
- **Stylowanie**: Tailwind CSS | Jquery
- **Animacje UI**: Framer motion
- **Elementy stylistyki**: Apex charts | Dark reader | Live clock | Lucide
- **Bundler**: Vite

## 📁 Struktura projektu

```bash
└── Wibbly/
    ├── .github
    ├── Projects.json
    ├── README.md
    ├── backend
    │   ├── .gitignore
    │   ├── README.md
    │   ├── controller
    │   │   ├── person.js
    │   │   └── user.js
    │   ├── dao
    │   │   ├── person.js
    │   │   └── user.js
    │   ├── db
    │   │   ├── db.js
    │   │   ├── knexfile.js
    │   │   ├── migrations
    │   │   └── seeds
    │   ├── index.js
    │   ├── middlewares
    │   │   └── authMiddleware.js
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── routes
    │   │   └── index.js
    │   ├── service
    │   │   ├── person.js
    │   │   └── user.js
    │   ├── ws
    │   │   └── websocketHandler.js
    │   └── yarn.lock
    ├── package-lock.json
    ├── package.json
    ├── public
    ├── src
    │   ├── 3D
    │   │   ├── Character.jsx
    │   │   ├── Figurka3.jsx
    │   │   ├── Figurka6.jsx
    │   │   └── Scene.jsx
    │   ├── App.css
    │   ├── App.js
    │   ├── App.test.js
    │   ├── Context
    │   │   ├── ColorModeContext.js
    │   │   └── PalleteContext.js
    │   ├── Hooks
    │   │   └── useWidth.js
    │   ├── Main.scss
    │   ├── assets
    │   ├── components
    │   │   ├── Aboatme.js
    │   │   ├── Auth.js
    │   │   ├── AuthRequest.jsx
    │   │   ├── CheckUser.js
    │   │   ├── CreateUser.js
    │   │   ├── Footer.js
    │   │   ├── Home-word.js
    │   │   ├── Home.js
    │   │   ├── Inputtest.js
    │   │   ├── Logo.js
    │   │   ├── Motiontest.js
    │   │   ├── Navbar.js
    │   │   ├── NewProfile
    │   │   ├── Offer.js
    │   │   ├── PalleteSection.js
    │   │   ├── Profile
    │   │   ├── Projects.jsx
    │   │   ├── RUser.js
    │   │   ├── ResponsiveScriptScale.js
    │   │   ├── User.js
    │   │   ├── WsRequest.js
    │   │   └── multiRef
    │   ├── constants
    │   │   ├── Colors.js
    │   │   └── index.js
    │   ├── index.css
    │   ├── index.js
    │   ├── logo.svg
    │   ├── reportWebVitals.js
    │   ├── setupTests.js
    │   └── styles.css
    ├── tailwind.config.js
    └── yarn.lock    
```

## ⚙️ Instalacja i uruchomienie

### 1. Klonowanie repozytorium

```
git clone https://github.com/Ilovereact-so/Wibbly

```
### 2. Konfiguracja `.env`
```bash
NODE_ENV=development
DB_CLIENT=mysql2
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=booking_system
```
### 2. Konfiguracja `.env` dla frontend
Potrzebny tunelowany URL - Używanie ciasteczek (refresh token)
```bash
HOST= 192.168.0.102
REACT_APP_TUNNEL_URL = http://127.0.0.1:9191
```

### 3. Instalacja zależności
```
npm install
```
### 4. Migracje i seedy
```
npx knex migrate:latest --knexfile db/knexfile.js
npx knex seed:run --specific=db/seeds/02_projects.js --knexfile db/knexfile.js
```
### 5. Uruchomienie serwera -- backend (nodemon)
```
npm run dev
```

### 4. Uruchomienie serwera -- frontend (react.js)
```
npm start
```
## ⚠️ Informacje dodatkowe

- Ten projekt został stworzony jako demonstracja moich umiejętności i jest udostępniony do **wglądu**.  
- Nie jest przeznaczony do użytku produkcyjnego ani komercyjnego.

