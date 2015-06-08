/**
 * Created by Administrator on 2015/6/8.
 */
var greetin=function(){
var time=new Date().getHours();
    var greeting='';
    if(time>=6 && time<12){
        greeting="早上好";
    }else if(time>=12 && time<18){
        greeting="下午好";
    }else{
        greeting="晚上好";
    }
return greeting;
};
exports.Time=greetin;
