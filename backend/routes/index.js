const express = require('express');
const personController = require('../controller/person');
const userController = require('../controller/user');
const app = express();
const router = express.Router();

router.post("/api/checkaccount", (req ,res) => {
    res.set('Access-Control-Allow-Origin', '*');
    //res.set(cors())
    //res.send({ "msg": req.body })
    console.log(req.body)
    userController.checkAccount(req, res)
}); 
router.post('/api/searchaccount', (req ,res) => {
    res.set('Access-Control-Allow-Origin', '*');
    //res.set(cors())
    //res.send({ "msg": req.body })
    console.log(req.body)
    userController.searchAccount(req, res)
});

router.post('/api/signupuser', (req ,res) => {
    res.set('Access-Control-Allow-Origin', '*');
    //res.set(cors())
    //res.send({ "msg": req.body })
    console.log(req.body)
    userController.signupUser(req, res)
});

router.post('/api/login', (req ,res) => {
    res.set('Access-Control-Allow-Origin', '*');
    //res.set(cors())
    //res.send({ "msg": req.body })
    console.log(req.body)
    userController.loginUser(req, res)
});

router.post('/api/auth', (req ,res) => {
    res.set('Access-Control-Allow-Origin', '*');
    //res.set(cors())
    //res.send({ "msg": req.body })
    console.log(req.body)
    userController.authUser(req, res)
});

router.post('/api/register', userController.registerUser);

module.exports = router;
