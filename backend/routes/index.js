const express = require('express');
const personController = require('../controller/person');
const userController = require('../controller/user');
const authenticateToken = require('../middlewares/authMiddleware');
const app = express();
const router = express.Router();
const cors = require('cors');

const allowHost = 'http://192.168.0.102:3000'

router.post('/api/searchaccount', (req ,res) => {
    //res.set('Access-Control-Allow-Origin', 'https://restninja.io');
    //res.set(cors())
    //res.send({ "msg": req.body })
    console.log(req.body)
    userController.searchAccount(req, res)
});


router.post('/api/signupuser', (req ,res) => {
    //res.set('Access-Control-Allow-Origin', '*');
    //res.set(cors())
    //res.send({ "msg": req.body })
    console.log(req.body)
    userController.signupUser(req, res)
});

router.post('/api/auth', (req ,res) => {
    res.set('Access-Control-Allow-Origin', '*');
    //res.set(cors())
    //res.send({ "msg": req.body })
    console.log(req.body)
    userController.authUser(req, res)
});
router.get('/api/logout',authenticateToken, (req ,res) => {
    res.set('Access-Control-Allow-Origin', allowHost);
    res.set('Access-Control-Allow-Headers', 'authorization, Content-Type, deviceId');

    //res.set(cors())
    //res.send({ "msg": req.body })
    console.log(req.body)
    userController.logoutUser(req, res)
});

router.get('/api/viewprojects', authenticateToken, (req ,res) => {
    res.set('Access-Control-Allow-Origin', allowHost);
    res.set('Access-Control-Allow-Headers', 'authorization, Content-Type, device_id');
    userController.viewProject(req, res)
});
router.post('/api/setsettings', (req ,res) => {
    res.set('Access-Control-Allow-Origin', '*');
    //res.set(cors())
    //res.send({ "msg": req.body })
    console.log(req.body)
    userController.setSettings(req, res)
});
router.post('/api/viewsettings', (req ,res) => {
    res.set('Access-Control-Allow-Origin', '*');
    //res.set(cors())
    //res.send({ "msg": req.body })
    console.log(req.body)
    userController.viewSettings(req, res)
});
router.post("/api/checkaccount", (req ,res) => {
    res.set('Access-Control-Allow-Origin', allowHost);
    //res.set(cors())
    //res.send({ "msg": req.body })
    console.log(req.body)
    userController.checkAccount(req, res)
}); 
router.post('/api/login', (req ,res) => {
    res.set('Access-Control-Allow-Origin', allowHost);
    //res.set(cors())
    //res.send({ "msg": req.body })
    console.log("req.body",req.body)
    userController.loginUser(req, res)
});
router.post('/api/getaccess', authenticateToken, (req ,res) => {
    res.set('Access-Control-Allow-Origin', allowHost);
    res.set('Access-Control-Allow-Headers', 'authorization, Content-Type, deviceId');
    //res.set(cors())
    //res.send({ "msg": req.body })
    console.log("req.body",req.body)
    userController.getAccess(req, res)
});

router.get('/api/fauthorizeuser', authenticateToken, (req ,res) => {
    res.set('Access-Control-Allow-Origin', allowHost);
    res.set('Access-Control-Allow-Headers', 'authorization, Content-Type, deviceId, skip_zrok_interstitial');
    userController.FAuthorizeUser(req, res)
});
router.get('/api/refresh-accesstoken', (req ,res) => {
    res.set('Access-Control-Allow-Origin', allowHost);
    //res.set('Access-Control-Allow-Headers', 'authorization, Content-Type, device_id');
    
    userController.RefreshAT(req, res)
});
router.get('/api/securycheck', (req ,res) => {
    res.set('Access-Control-Allow-Origin', allowHost);
    //res.set('Access-Control-Allow-Headers', 'authorization, Content-Type, device_id');
    userController.securyCheck(req, res)
});
router.get('/api/checkcookie',cors(), (req ,res) => {
    res.set('Access-Control-Allow-Origin', allowHost);
    //res.set('Access-Control-Allow-Headers', 'authorization, Content-Type, device_id');
    const token = req.cookies.refresh_token; // Pobieramy ciasteczko 'token'
    console.log(req.cookies)
    if (token) {
        res.json({ message: `Wartość ciasteczka 'token': ${token}`})
    } else {
        res.send({ message: 'Brak ciasteczka o nazwie "refresh_token"'});
    }
});

router.get('/api/setcookie', (req, res) => {
    res.cookie('niger', 'testValue', {
        httpOnly: true,
        secure: true,       // Ustaw na true, jeśli używasz HTTPS
        sameSite: 'None',    // Wymagane dla ciasteczek między różnymi portami
        maxAge: 24 * 60 * 60 * 1000
    });
    res.send('Ciasteczko zostało ustawione');
    console.log("ciastka")
});
router.get('/api/niga', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send('<h1>Witaj na mojej stronie! To jest niestandardowy komunikat!</h1>');
});

// router.get('/api/test-get', (req, res) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');  // lub Ngrok URL
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.json({ message: 'GET request received successfully!' });
//     res.status(205)
//     console.log("cwl")
//   });
//router.post('/api/register', userController.registerUser);


module.exports = router;
