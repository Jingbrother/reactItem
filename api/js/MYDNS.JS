const pageInfo={
    pagenum:1,
    pagesize:3,
    total:0,
    totalpage:0
}
let box;
let val1;
let butt;
let xx=getUrlParam('token');
$('.mydns1>ul>li>span').click(function(){
    $(this).next().slideToggle(300)
})
main()
function main(){
    $('.f1').click(function(){
        $('.mydns2').html(`
        <div class="mydns3">
        <div>XXX管理系统注册</div>
        <input class='g1' type="text" placeholder="邮箱"><br><p class='w1' style="margin-left:46px;color:red;position:absolute;top:156px;font-size:12px;display: none">邮箱格式不正确，请重新输入</p><br>
        <input class='g2' type="text" placeholder="密码"><br><p style="margin-left:46px;color:red;position:absolute;top:217px;font-size:12px;display: none">账号或密码错误，请重新输入</p><br>
        <input class='g3' type="text" placeholder="请输入邮箱验证码"><button class='but1' >发送邮箱验证码</button><br><p class='w2' style="margin-left:46px;color:red;position:absolute;top:270px;font-size:12px;display: none">验证码不正确，请重新输入</p><br>
        <button class="but2">注册</button>
    </div>
        `)
        $('.g1').on('blur',function(){
            let regu=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
            let re = new RegExp(regu);
            if(re.test($('.g1').val())){
                $('.w1').css('display','none')
            }else{
                $('.w1').css('display','block')
            }
        })
        main1()
    })
}
function main1(){
    $('.but1').click(function(){
        let regu=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        let re = new RegExp(regu);
        if(re.test($('.g1').val())){
            $('.w1').css('display','none')
            let val1=$('.g1').val()
            $.ajax({
                url:'http:localhost:3000/admin/user/sendMail',
                data:{
                    username:val1
                },
                type:'post',
                success(data){
                    if(data.err===-2){
                        $('.w2').html('验证码发送失败，请重新发送')
                        $('.w2').css('display','block')
                        }
                    }
                })
            }else{
                $('.w1').css('display','block')
            }
    })
    $('.but2').click(function(){
        let regu=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        let re = new RegExp(regu);
        if(re.test($('.g1').val())){
            $('.w1').css('display','none')
        let val1=$('.g1').val()
        let val2=$('.g2').val()
        let val3=$('.g3').val()
        $.ajax({
            url:'http:localhost:3000/admin/user/register',
            data:{
                username:val1,
                password:val2,
                code:val3
            },
            type:'post',
            success(data){
                if(data.msg==='验证码不正确，请重新输入'){
                    $('.w2').html('验证码不正确，请重新输入')
                    $('.w2').css('display','block')
                }else if(data.msg==='该邮箱已经被占用，请重新输入'){
                    $('.w2').html('该邮箱已经被占用，请重新输入')
                    $('.w2').css('display','block')
                }else if(data.msg==='login ok'){
                    $('.w2').html('注册成功，欢迎使用XXX管理系统')
                    $('.w2').css('display','block')
                }else{
                    $('.w2').html('注册失败，未知错误，请联系管理员')
                    $('.w2').css('display','block')
                }
            }
        })
        }else{
            $('.w1').css('display','block')
        }
    })
}
ma()
function ma(){
    $('.h1').click(function(){
        let xx=getUrlParam('token');
        $.ajax({
            url:'http:localhost:3000/admin/food/getFoods',
            data:{
                token:xx,
                page:pageInfo.pagenum,
                pagesize:pageInfo.pagesize
            },
            success(data){
                pageInfo.total=data.count;
                pageInfo.totalpage=Math.ceil(pageInfo.total/pageInfo.pagesize);
                pageInfo.pagenum=1;
                ma1(data)
                box=document.querySelector('.box')
                bindPagi()
            }
        })
    })
}
function ma1(data){
    let str=''
    str+=`<div class="mydns4">
    <input type="text" class='h2' placeholder="查询菜品"><button class="butt">查询</button>
    <table border="1">
        <tr>
            <th>序号</th>
            <th>图片</th>
            <th>菜名</th>
            <th>价格</th>
            <th>菜品描述</th>
            <th>类别</th>
            <th>操作</th>
        </tr>`;
    if(data.err===0){
        for(let i=0;i<data.list.length;i++){
            str+=`<tr>
            <td style="text-align: center">${i+1}</td>
            <td><img style="width:100%;height:100%" src='${data.list[i].imgPath}'></td>
            <td style="text-align: center">${data.list[i].name}</td>
            <td style="text-align: center">${data.list[i].price}</td>
            <td style="text-align: center">${data.list[i].desc}</td>
            <td style="text-align: center">${data.list[i].foodType}</td>
            <td><span style="margin-left:20px;margin-right:10px">删除</span><span>修改</span></td>
        </tr>`
        }
        str+=`
        </table>
    </div>
    <div class='box'></div>`
    $('.mydns2').html(str)
    
    butt=$('.butt')
    
    butt.click(function(){
        val1=$('.h2').val();
        fe(val1)
    })
    }
}
function bindPagi(){
    new Pagination(box,{
        pageInfo:pageInfo,
        textInfo:{
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '末页'
        },
        change(n){
            if(n===pageInfo.pagenum)return
            pageInfo.pagenum=n;
            $('.focus').html(pageInfo.pagenum)
            let xx=getUrlParam('token');
            $.ajax({
                url:'http:localhost:3000/admin/food/getFoods',
                data:{
                    token:xx,
                    page:pageInfo.pagenum,
                    pagesize:pageInfo.pagesize
                },
                success(data){
                    ma1(data)
                    box=document.querySelector('.box')
                    bindPagi()
                }
            })
        }
    })
}
function fe(val1){
    $.ajax({
        url:'http:localhost:3000/admin/food/getDimFoods',
        data:{
            token:xx,
            name:val1,
            page:pageInfo.pagenum,
            pagesize:pageInfo.pagesize
        },
        success(data){
            pageInfo.total=data.count; 
            pageInfo.totalpage=Math.ceil(pageInfo.total/pageInfo.pagesize);
            pageInfo.pagenum=1;
            ma1(data)
            box=document.querySelector('.box')
            bindPagi()
        }
    })
}
fff()
function fff(){
    $('.h2').click(function(){
        $('.mydns2').html(`
        <div class="mydns5">
        <div class='grgr'>点击上传图片</div><input type="file" name="file0" id="file0"><span class="fff" style="display:inline-block;background:#ccc;height:50px;width:50px;text-align: center;line-height: 50px;cursor:pointer;">上传</span>
        <input class='v1' type="text" placeholder="菜名"><br>
        <input class='v2' type="text" placeholder="价格"><br>
        <input class='v3' type="text" placeholder="菜品描述"><br>
        <input class='v4' type="text" placeholder="类别"><br>
        <button class='hhh'>添加菜品</button><div class='hhhhh' style='color:red;'></div>
    </div>
        `)
        fgh()
    })
}
function fgh(){
    $('.fff').click(function(){
    let serverPath = 'http://10.60.14.17:3000'
    let file=$('#file0')[0].files[0]
    const formdata=new FormData()
    formdata.append('img',file)
    $.ajax({
        method:'POST',
        url:serverPath+'/admin/file/img',
        data:formdata,
        processData:false,
        contentType:false,
        cache:false,
        success(data){
           if(data.err===0){
            $('.grgr').html(`<img class='jjj' src='http://10.60.14.17:3000${data.imgPath}' style="width:100%;height:100%">`)
           }else{
            alert(data.msg)
           }
        }
    })
})
$('.hhh').click(function(){
    let src=$('.jjj').attr('src');
    let v1=$('.v1').val();
    let v2=$('.v2').val();
    let v3=$('.v3').val();
    let v4=$('.v4').val();
    $.ajax({
        url:'http:localhost:3000/admin/food/addfood',
        data:{
            name:v1,
            price:v2,
            imgPath:src,
            foodType:v4,
            desc:v3,
            token:xx
        },
        success(data){
            if(data.err===0){
                $('.hhhhh').html('商品添加成功')
            }else{
                $('.hhhhh').html('已有此商品，请重新添加')
            }
        }
    })
})
}
function getUrlParam(name) {//封装方法
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}