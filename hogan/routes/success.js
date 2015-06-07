/**
 * Created by Administrator on 2015/6/7.
 */
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('success', { title: 'Express'  ,username:new Date().getDate()});
});


router.post('/', function(req, res, next) {
    if(req.body.username.replace(/(^\s*)|(\s*$)/g, "")=="" || req.body.password.replace(/(^\s*)|(\s*$)/g, "")=="" ){
        res.redirect('/');
    }else{
        res.render('success', { title: 'Express' ,username:req.body.username});
    }

});


module.exports = router;