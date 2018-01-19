var express = require('express');
var router = express.Router();

var userService = require('../module/service/UserService');


app.get('/session',function(req, res){
    res.send('success')
    
})