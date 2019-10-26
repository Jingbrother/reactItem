const express=require('express');
const router=express.Router();
const FoodModel=require('../db/model/FoodModel')
//添加电影api接口
router.get('/addfood',(req,res,next)=>{
    let {name}=req.query;
    FoodModel.findOne({name})
    .then((data)=>{
        if(data){
            res.send({err:-2,msg:'电影已存在，不可以加入相同菜品'})
        }else{
            next()
        }
    })
    .catch((err)=>{
        res.send({err:-1,msg:'内部错误'})
    })
},(req,res)=>{
    let {name,img,showtime,state,actor,price,grade,boxOffice}=req.query;
    FoodModel.insertMany({name,img,showtime,state,actor,price,grade,boxOffice})
    .then((data)=>{
        res.send({err:0,msg:'电影加入成功'})
    })
    .catch((err)=>{
        res.send({err:-1,msg:'内部错误'})
    })
})
//查询所有电影信息
router.get('/getFoo',(req,res)=>{
    FoodModel.find()
    .then((data)=>{
        res.send({err:0,msg:'获取电影成功',data:data})
    })
    .catch(()=>{
        res.send({err:-1,msg:'内部错误'})
    })
})
//分页电影信息api接口
router.get('/getFoods',(req,res)=>{
    let page=req.query.page||1;
    let pagesize=req.query.pagesize||10;
    let count=0;
    FoodModel.find()
    .then((data)=>{
        count=data.length;
        return FoodModel.find().skip(Number((page-1)*pagesize)).limit(Number(pagesize))
    })
    .then((data)=>{
        res.send({err:0,msg:'获取电影成功',list:data,count:count})
    })
    .catch(()=>{
        res.send({err:-1,msg:'内部错误'})
    })
})
//删除某一条商品信息api接口
router.get('/delFood',(req,res)=>{
    const {_id}=req.query;
    FoodModel.deleteOne({_id})
    .then((data)=>{
        res.send({err:0,msg:'删除电影成功'})
    })
    .catch((err)=>{
        res.send({err:-1,msg:'内部错误'})
    })
})
//分类查询商品信息api接口
router.get('/getFoodsByType',(req,res)=>{
    const {state}=req.query;
    FoodModel.find({state})
    .then((data)=>{
        if(data.length===0){
            res.send({err:-2,msg:'未查询到相关数据,请关注后续更新'})
        }else{
            res.send({err:0,msg:'查询成功',list:data})
        }
    })
    .catch((err)=>{
        res.send({err:-1,msg:'内部错误',list:data})
    })
})
//分页+分类api接口
router.get('/getFoodsByPage',(req,res)=>{
    let page=req.query.page||1;
    let pagesize=req.query.pagesize||10
    let count=0;
    let  foodType=req.query.foodType
    let obj={}
    if(foodType){
        obj.foodType=foodType;
    }
    FoodModel.find(obj)
    .then((data)=>{
        count=data.length;
        return FoodModel.find(obj).skip(Number((page-1)*pagesize)).limit(Number(pagesize))
    })
    .then((data)=>{
        res.send({err:0,msg:'获取电影成功',list:data,count:count})
    })
    .catch((err)=>{
        res.send({err:-1,msg:'内部错误'})
    })
})
//模糊查询api接口
router.get('/getDimFoods',(req,res)=>{
    let name=req.query.name;
    FoodModel.find({name:{$regex:name}})
    .then((data)=>{
        if(data.length===0){
            res.send({err:-2,msg:'未查询到相关数据,请关注后续更新'})
        }else{
            res.send({err:0,msg:'查询成功',list:data})
        }
    })
    .catch((err)=>{
        res.send({err:-1,msg:'内部错误'})
    })
})
//修改电影api接口
router.get('/revampFood',(req,res)=>{
    let {_id,name,img,showtime,state,actor,price,grade,boxOffice}=req.query;
    FoodModel.updateOne({_id},{name,img,showtime,state,actor,price,grade,boxOffice})
    .then((data)=>{
        res.send({err:0,msg:'修改成功'})
    })
    .catch((err)=>{
        res.send({err:-1,msg:'内部错误'})
    })
})
//修改上线下线
router.get('/updata',(req,res)=>{
    let {state,_id}=req.query;
    FoodModel.updateOne({_id},{state})
    .then((data)=>{
        res.send({err:0,msg:'修改成功'})
    })
    .catch((err)=>{
        res.send({err:-1,msg:'内部错误'})
    })
})
module.exports=router;