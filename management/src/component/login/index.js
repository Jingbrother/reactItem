import React from 'react'
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import './index.less'
class Login extends React.Component{
    login=()=>{
        this.props.form.validateFields((err,data)=>{
            if(err){
                message.error('您输入的信息有误，请重新输入')
            }else{
                this.$axios.post('http://39.96.45.250:3000/admin/user/login',{us:data.username,ps:data.password})
                .then((data1)=>{
                    let data2=data1.data
                    if(data2.err===0){
                        message.success('登录成功1s后跳转首页',1,()=>{
                            this.props.history.push('/admin/home')
                        })
                    }else if(data2.err===-2){
                        message.error('用户名和密码不正确，请重新输入')
                    }else{
                        message.error('系统错误，请联系管理员')
                    }
                })
            }
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className='login-box'>
                <div className="login-form">
                    <div className='login-header'>电影后台管理系统登录</div>
                    <Form.Item>
                        {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入您的用户名!' }],
                        })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="用户名"
                        />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入您的密码!' }],
                        })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="密码"
                        />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                        })(<Checkbox>记住密码</Checkbox>)}
                        <a className="login-form-forgot" href="">
                        忘记密码
                        </a>
                        <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.login}>
                        登录
                        </Button>
                    </Form.Item>
                </div>
            </div>
        )
    }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default WrappedNormalLoginForm