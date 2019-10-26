const express=require('express');
const router=express.Router();
const userModel=require('../db/model/userModel')
const Mail=require('../utils/mail')
const jwt=require('../utils/jwt')
let codes={}
//登录api接口
router.post('/login',(req,res)=>{
    console.log(req)
    const {us,ps}=req.body;
    userModel.findOne({us,ps})
    .then((data)=>{
        if(data){
            let token=jwt.createToken({uid:data._id,us:us},7*24*60*60)
            res.send({err:0,msg:'login ok',token:token,us:us})
        }else{
            res.send({err:-2,msg:'login nook'})
        }
    })
    .catch((err)=>{
        res.send({err:-1,msg:'内部错误'})
    })
})
//注册api接口
router.post('/register',(req,res,next)=>{
    let {us,code}=req.body;
    if(Number(code)===Number(codes[us])){
        next()
    }else{
        res.send({err:-2,msg:'验证码不正确，请重新输入'})
    }
},(req,res,next)=>{
    let {us}=req.body;
    userModel.findOne({us})
    .then((data)=>{
        if(data){
            res.send({err:-2,msg:'该邮箱已经被占用，请重新输入'})
        }else{
            next();
        }
    })
    .catch((err)=>{
        res.send({err:-1,msg:'内部错误'})
    })
},(req,res)=>{
    let {us,ps}=req.body;
    userModel.insertMany({us,ps})
    .then((data)=>{
        res.send({err:0,msg:'login ok'})
    })
    .catch((err)=>{
        res.send({err:-1,msg:'内部错误'})
    })
})
//发送验证码api接口
router.post('/sendMail',(req,res)=>{
    let {us}=req.body;
    let code=parseInt(Math.random()*10000);
    codes[us]=code;
    Mail.send(us,code)
    .then((data)=>{
        res.send({err:0,msg:'send ok'})
    })
    .catch((err)=>{
        res.send({err:-2,msg:'send nook'})
    })
})
module.exports=router;