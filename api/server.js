const express=require('express');
const http=require('http')
const app=express();
const jwt=require('./utils/jwt')
const cors =require('cors')
const bodyParser=require('body-parser')
const path=require('path')
app.use('/public',express.static(path.join(__dirname,'./public')))
app.use(express.static(path.join(__dirname,'./www')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
const db=require('./db/connect')
const AdminUserRouter=require('./router/adminUserRouter')
app.use('/admin/user',AdminUserRouter)
const AdminFoodRouter=require('./router/adminFoodRouter')
const AdminUsergRouter=require('./router/adminUsergRouter')
app.use('/admin/userg',(req,res,next)=>{
    let {token}=req.body;
    jwt.verifyToken(token)
    .then(()=>{
        next()
    })
    .catch(()=>{
        res.send({err:-2,msg:'登录已过期，请重新登录'})
    })
},AdminUsergRouter)
app.use('/admin/food',(req,res,next)=>{
    let {token}=req.query;
    jwt.verifyToken(token)
    .then(()=>{
        next()
    })
    .catch(()=>{
        res.send({err:-2,msg:'登录已过期，请重新登录'})
    })
},AdminFoodRouter)
const AdminFileRouter=require('./router/adminFileRouter')
app.use('/admin/file',AdminFileRouter)
app.listen(3000,"0.0.0.0",()=>{
    console.log(`/**
    *　　　　　　　 ┏┓　 ┏┓+ +
    *　　　　　　　┏┛┻━━━┛┻┓ + +
    *　　　　　　　┃　　　　　　┃ 　
    *　　　　　　　┃　　　━　　 ┃ ++ + + +
    *　　　　　　 ████━████  ┃+
    *　　　　　　　┃　　　　　　　┃ +
    *　　　　　　　┃　　　┻　　　┃
    *　　　　　　　┃　　　　　　┃ + +
    *　　　　　　　┗━┓　　　┏━┛
    *　　　　　　　　 ┃　　　┃　　　　　　　　　　　
    *　　　　　　　　 ┃　　　┃ + + + +
    *　　　　　　　　 ┃　　　┃　　　　Code is far away from bug with the animal protecting　　　　　　　
    *　　　　　　　　 ┃　　　┃ + 　　　　神兽保佑,代码无bug　　
    *　　　　　　　　 ┃　　　┃
    *　　　　　　　　 ┃　　　┃　　+　　　　　　　　　
    *　　　　　　　　 ┃　 　 ┗━━━┓ + +
    *　　　　　　　　 ┃ 　　　　   ┣┓
    *　　　　　　　　 ┃ 　　　　　 ┏┛
    *　　　　　　　　 ┗┓┓┏━┳┓┏┛ + + + +
    *　　　　　　　　  ┃┫┫ ┃┫┫
    *　　　　　　　　  ┗┻┛ ┗┻┛+ + + +
    */`)
})