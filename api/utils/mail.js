const nodemailer = require('nodemailer');
// 创建发送邮件的对象
let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: '809329260@qq.com', // generated ethereal user
        pass: 'cvihjxjolpwfbdgd'// smtp 验证码
    }
});
module.exports ={
  send(mail,code){
    // 邮件的内容
    let  info={
      from: '"Fred Foo 👻" <809329260@qq.com>', // sender address
      to: mail, // list of receivers
      subject: '呵呵哒', // Subject line
      // text: , // plain text body
      html: `<h3>欢迎注册您的验证码是：${code} </h3>` // html body
    }
    return  new Promise((resolve,reject)=>{
      transporter.sendMail(info,(err,result)=>{
        if(err){
          reject()
        }else{
          resolve()
        }
      });
    })
  }
}