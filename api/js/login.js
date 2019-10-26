$('.but').click(function(){
    let mail=$('.val').val();
    let pass=$('.val2').val();
    $.ajax({
        url:'http:localhost:3000/admin/user/login',
        data:{
            username:mail,
            password:pass
        },
        type:'POST',
        success(data){
            if(data.err===0){
                window.location.href=`file:///D:/h5_1913/disanjieduan/day4/XXX/www/MyDNS.html?token=${data.token}`
            }else{
                $('.mi').css('display','block')
            }
        }
    })
    return false;
})