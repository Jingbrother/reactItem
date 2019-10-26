const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    us:{type:String,require:true},
    ps:{type:String,default:'123456'},
    age:{type:String,require:true},
    role:{type:String,require:true},
    sex:{type:String,require:true}
})
const model=mongoose.model('users',userSchema);
module.exports=model;