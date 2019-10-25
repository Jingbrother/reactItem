import React ,{Component} from 'react'
import {Card,Input, Button} from 'antd'
import './useradd.less'
class UserAdd extends Component{
    constructor(){
        super()
        this.state={
          us:'',
          age:'',
          role:'',
          sex:''
        }
    }
    add=()=>{
        console.log(this.state)
        let url='http://39.96.45.250:3000/admin/userg/addUser'
        let _token=localStorage.getItem('token')
        this.$axios.post(url,{us:this.state.us,age:this.state.age,role:this.state.role,sex:this.state.sex,token:_token})
        .then((data)=>{
            console.log(data)
            this.props.history.push('/admin/user/all')
        })
    }
    render(){
        return(
            <div className='useradd-box'>
                <Card style={{width:'500px',margin:'0 auto'}}>
                <div className='example-input'>
                <label>us:</label>
                    <Input type="text" placeholder="请输入用户名" value={this.state.us} 
                    onChange={(e)=>{
                        this.setState({us:e.target.value})
                        
                    }}/>
                    <label>age:</label>
                    <Input type="text"  placeholder="请输入年龄" value={this.state.age}
                    onChange={(e)=>{
                        this.setState({age:e.target.value})
                        
                    }}
                    />
                    <label>role:</label>
                    <Input type="text"  placeholder="请输入角色，如管理员" value={this.state.role}
                    onChange={(e)=>{
                        this.setState({role:e.target.value})
                    }}
                    />
                    <label>sex:</label>
                    <Input type="text" placeholder="请输入性别，如男" value={this.state.sex}
                    onChange={(e)=>{
                        this.setState({sex:e.target.value})
                    }}
                    />
                    <Button type="primary" onClick={this.add} style={{margin:'20px 200px'}}>添加</Button>
                </div>
                </Card>
            </div>
        )
    }
}
export default UserAdd