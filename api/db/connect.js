const mongoose=require('mongoose');
mongoose.connect('mongodb://39.96.45.250/react01', {useNewUrlParser: true})
const db=mongoose.connection;
db.on('error',()=>{
    console.log('db no ok')
})
db.once('open',()=>{
    console.log('db ok')
})