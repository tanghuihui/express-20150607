/**
 * Created by Administrator on 2015/6/7.
 */
var express = require('express');
var router = express.Router();
var Time=require('../Biz/Time');
var moment=require('moment');
router.get('/', function(req, res, next) {
    res.render('success', { title: 'Express'  ,username:new Date().getDate()});
});


router.post('/', function(req, res, next) {
    if(req.body.username.replace(/(^\s*)|(\s*$)/g, "")=="" || req.body.password.replace(/(^\s*)|(\s*$)/g, "")=="" ){
        res.redirect('/');
    }else{
        if(!req.session.has('username')){
            req.session.put('username',req.body.username.trim());
       }
        res.render('success', { title: 'Express' ,greeting:function(){
            return function(){
              return  Time.Time();
                Time.Time();
            }
        },username:req.body.username,hhlist:[

            {picName:'哆啦A梦',picDesc:'第七公社 三口亲子装夏装2015新款 哆啦A梦全家装t恤衫短袖母女装 ',imgSrd:'/images/1.jpg'},
            {picName:'哆啦A梦',picDesc:'第七公社 亲子装夏装2015款哆啦A梦全家装 韩版母女装短袖t恤童装 ',imgSrd:'/images/2.jpg'},
            {picName:'哆啦A梦',picDesc:'第七公社 短袖T恤女夏装情侣装 2015新款体恤哆啦A梦宽松半袖t恤 ',imgSrd:'/images/3.jpg'},
            {picName:'哆啦A梦',picDesc:'第七公社 哆啦A梦伴我同行T恤女夏装新款2015印花短袖t恤闺蜜装萌 ',imgSrd:'/images/4.jpg'},
            {picName:'哆啦A梦',picDesc:'第七公社 扑倒蓝胖子哆啦a梦t恤情侣装夏装2015款短袖t恤女韩版潮 ',imgSrd:'/images/5.jpg'}
        ]});
    }

})


module.exports = router;