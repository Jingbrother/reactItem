import React from 'react'
import { Form, Row, Col, Input, Button, Icon, message } from 'antd';
import './index.less'
class UserUpdata extends React.Component{
    constructor(){
        super()
        this.state={
            value:'',
            value1:'',
            value2:'',
            value3:''
        }
    }
    componentDidMount(){
        this.state.value=this.props.xxx.us
        this.state.value1=this.props.xxx.age
        this.state.value2=this.props.xxx.role
        this.state.value3=this.props.xxx.sex
        this.setState({})
    }
    dff=()=>{
        this.$axios.post('http://39.96.45.250:3000/admin/userg/modification',{token:localStorage.getItem('token'),_id:this.props.xxx.key,us:this.state.value,age:this.state.value1,role:this.state.value2,sex:this.state.value3})
        .then((data)=>{
            if(data.data.err===0){
                message.success('修改完成')
                this.setState({})
                this.props.updata()
                this.props.yyy(this.props.xxx,this.state.value,this.state.value1,this.state.value2,this.state.value3)
            }
        })
    }
    render(){
        return(
            <div className='user-updata'>
                <div className='user-updata-from'>
                    <Row>
                        <Col span={4} key={1} value='ssss'>
                            <Form.Item label='用户名'>
                                <Input placeholder="请输入用户名" value={this.state.value} onChange={(e)=>{
                                    this.state.value=e.target.value
                                    this.setState({})
                                }}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={4} key={2}>
                            <Form.Item label='年龄'>
                                <Input placeholder="请输入年龄" value={this.state.value1} onChange={(e)=>{
                                    this.state.value1=e.target.value
                                    this.setState({})
                                }}/>
                            </Form.Item>
                        </Col>
                        <Col span={4} key={3}>
                            <Form.Item label='角色'>
                                <Input placeholder="请输入角色" value={this.state.value2} onChange={(e)=>{
                                    this.state.value2=e.target.value
                                    this.setState({})
                                }}/>
                            </Form.Item>
                        </Col>
                        <Col span={4} key={4}>
                            <Form.Item label='性别'>
                                <Input placeholder="请输入性别" value={this.state.value3} onChange={(e)=>{
                                    this.state.value3=e.target.value
                                    this.setState({})
                                }}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit" onClick={()=>{
                                this.dff()
                            }}>
                                确定
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={()=>{
                                this.props.updata()
                            }}>
                                取消
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
export default Form.create({ name: 'advanced_search' })(UserUpdata)