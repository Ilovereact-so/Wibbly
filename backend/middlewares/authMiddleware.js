const jwt = require('jsonwebtoken');
const secret = 'kurwakurwaKondzioCwelkurwakurwa'; // Sekretny klucz do podpisywania tokenów

function authenticateToken(req, res, next) {
    console.log("headersNN_authMiddleware",req.headers);
    
    const accessToken = req.headers['authorization']; // Odbierz token z nagłówka
    const deviceId = req.headers['deviceid'];
    //console.log(req)
     if (!accessToken || !deviceId) {
        console.log("niger")
        console.log(deviceId, accessToken)
        return res.status(401).json({ msg: 'Unauthorized' });
    }

    // Weryfikacja tokenu
    jwt.verify(accessToken, secret, (err, decoded) => {
        if (!err && decoded.device_id !== deviceId) {
            return res.status(401).json({ msg: 'Unauthorized: invalid device' });
        }

        if (err) {
            console.log(err.name)
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ message: 'Access token expired' });
              }else{
                return res.status(500).json({ msg: 'Invalid access token.' });
              }
        }

        // Zapisujemy ID użytkownika w obiekcie request, aby był dostępny w kontrolerach
        req.userId = decoded.user_id;
        req.deviceId = decoded.device_id;
        req.accessToken = accessToken;

        next(); // Przechodzimy do następnej funkcji (kontrolera)
    });
}



module.exports = authenticateToken;