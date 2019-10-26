const express=require('express');
const router=express.Router();
const multer=require('multer')
const fs=require('fs')
const path=require('path')
router.post('/img',multer().single('img'),(req,res)=>{
    let {buffer,mimetype,originalname}=req.file;
    let filename=(new Date()).getTime()+parseInt(Math.random()*9999)+parseInt(Math.random()*9999)
    let types=['git','gif','png','jpeg','jpg'];
    let flieType=mimetype.split('/')[1]
    if(types.indexOf(flieType)===-1){
        return res.send({err:-2,msg:'类型错误，请重新输入'})
    }
    let extname=path.extname(originalname);
    fs.writeFile(path.join(__dirname,`../public/img/${filename}${extname}`),buffer,(err)=>{
        if(err){
            res.send({err:-1,msg:'文件上传错误'})
        }else{
            res.send({err:0,msg:'上传成功',imgPath:`http://39.96.45.250:3000/public/img/${filename}${extname}`})
        }
    })
})
module.exports=router