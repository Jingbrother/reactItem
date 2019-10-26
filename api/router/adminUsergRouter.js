const express=require('express');
const router=express.Router();
const userModel=require('../db/model/userModel')
//查询用户api
router.post('/about',(req,res)=>{
    userModel.find()
    .then((data)=>{
        if(data){
            res.send({err:0,msg:'about ok',data:data})
        }else{
            res.send({err:-2,msg:'about nook'})
        }
    })
    .catch((err)=>{
        res.send({err:-1,msg:'内部错误'})
    })
})
//修改用户api
router.post('/modification',(req,res)=>{
    const {_id,us,age,role,sex}=req.body;
    userModel.updateOne({_id},{$set:{us,age,role,sex}})
    .then((data)=>{
        if(data){
            res.send({err:0,msg:'修改 ok',data:data})
        }else{
            res.send({err:-2,msg:'修改 nook'})
        }
    })
    .catch((err)=>{
        res.send({err:-1,msg:'内部错误'})
    })
})
//删除用户api
router.post('/delUser',(req,res)=>{
    const {_id}=req.body;
    userModel.deleteOne({_id})
    .then((data)=>{
        res.send({err:0,msg:'删除用户成功'})
    })
    .catch((err)=>{
        res.send({err:-1,msg:'内部错误'})
    })
})
//增加用户api
router.post('/addUser',(req,res,next)=>{
    let {us}=req.body;
    userModel.findOne({us})
    .then((data)=>{
        if(data){
            res.send({err:-2,msg:'用户已存在，用户名不得重复'})
        }else{
            next()
        }
    })
    .catch((err)=>{
        res.send({err:-1,msg:'内部错误'})
    })
},(req,res)=>{
    let {us,age,role,sex}=req.body;
    console.log(us,age,role,sex)
    userModel.insertMany({us,age,role,sex})
    .then((data)=>{
        res.send({err:0,msg:'用户加入成功'})
    })
    .catch((err)=>{
        res.send({err:-1,msg:'内部错误'})
    })
})
//查找api
router.post('/findUser',(req,res)=>{
    let {us}=req.body;
    userModel.find({us})
    .then((data)=>{
        console.log(data)
        if(data.length===0){
            res.send({err:-2,msg:'未查找到相关数据,请关注后期更新'})
        }else{
            res.send({err:0,msg:'查找成功',data:data})
        }
    })
    .catch((err)=>{
        res.send({err:-1,msg:'内部错误'})
    })
})
module.exports=router;
