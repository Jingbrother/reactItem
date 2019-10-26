const mongoose=require('mongoose');
const foodSchema=mongoose.Schema({
    name:{type:String,required:true} ,
    showtime:{type:String,default:'上映时间暂定'},
    state:{type:String,required:true},
    actor:{type:String,default:'演员未知'},
    price:{type:String,default:'0'},
    grade:{type:String,default:'0'},
    boxOffice:{type:String,default:'0'},
    img:{type:String,default:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=378167113,3127914319&fm=26&gp=0.jpg'}
})
const model=mongoose.model('movies',foodSchema);
module.exports=model;