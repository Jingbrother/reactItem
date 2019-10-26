const jwt=require('jsonwebtoken');
const screat='saxsaxsafdsgffgghrerewewr3rdcdsgvcbd';
module.exports={
    createToken(payload,expires){
        let token=jwt.sign(payload,screat,{expiresIn:expires})
        return token;
    },
    verifyToken(token){
        return new Promise((resolve,reject)=>{
            jwt.verify(token,screat,(err,data)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    }
}