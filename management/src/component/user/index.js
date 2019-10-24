import React from 'react'
import UserUpdata from '../userupdata'
import {Table,Divider,Button, message,Input} from 'antd';
class User extends React.Component{
    constructor(){
        super()
        this.state={
            xianshi:false,
            xxx:{},
            value:'',
            columns:[
                {
                    title: '姓名',
                    dataIndex: 'us',
                    key: 'us',
                },
                {
                    title: '年龄',
                    dataIndex: 'age',
                    key: 'age',
                },
                {
                    title: '角色',
                    dataIndex: 'role',
                    key: 'role',
                },
                {
                    title: '性别',
                    key: 'sex',
                    dataIndex: 'sex'
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => (
                      <span>
                        <Button type="primary" onClick={()=>{
                            this.updata1()
                            this.updata(text)
                        }}>修改</Button>
                        <Divider type="vertical" />
                        <Button type="danger" onClick={this.del.bind(this,text)}>删除</Button>
                      </span>
                    ),
                },
            ],
            data:[]
        }
    }
    updata=(text)=>{
        this.state.xxx=text
    }
    updata1=()=>{
        this.state.xianshi=!this.state.xianshi
        this.setState({})
    }
    del(text){
        this.$axios.post('http://39.96.45.250:3000/admin/userg/delUser',{token:localStorage.getItem('token'),_id:text.key})
        .then((re)=>{
            if(re.data.err===0){
                let index=this.up(text)
                this.state.data.splice(index,1)
                this.setState({})
            }else if(re.data.err===-2){
                message.error('登录过期，请重新登录')
            }
        })
    }
    sxs=(text,value,value1,value2,value3)=>{
        let index=this.up(text)
         this.state.data[index].name=value
         this.state.data[index].age=value1
         this.state.data[index].role=value2
         this.state.data[index].sex=value3
         this.setState({})
    }
    up(val){
        for(let i=0;i<this.state.data.length;i++){
            if(this.state.data[i]==val) return i;
        }
        return -1
    }
    inquire=()=>{
        if(this.state.value==''){
            this.gh()
        }else{
            this.$axios.post('http://39.96.45.250:3000/admin/userg/findUser',{token:localStorage.getItem('token'),us:this.state.value})
            .then((df)=>{
                if(df.data.err===0){
                        this.state.data=df.data.data
                        message.success('查询成功')
                }else{
                    this.state.data=[]
                    message.error('未找到相关用户，请重试')
                }
                this.setState({})
            })
        }
    }
    gh=()=>{
        this.$axios.post('http://39.96.45.250:3000/admin/userg/about',{token:localStorage.getItem('token')})
        .then((data1)=>{
            let list=data1.data.data
            for(let i=0;i<list.length;i++){
                this.state.data.push({
                    key:list[i]._id,
                    us:list[i].us,
                    age:list[i].age,
                    role:list[i].role,
                    sex:list[i].sex
                })
            }
            this.setState({})
        })
    }
    componentDidMount(){
        this.gh()
    }
    render(){
        return(
            <div>
                {this.state.xianshi?<UserUpdata updata={this.updata1} xxx={this.state.xxx} yyy={this.sxs}></UserUpdata>:''}
                <Input placeholder="Basic usage" style={{width:'300px',margin:'20px'}} placeholder='请输入用户名' value={this.state.value} onChange={(e)=>{
                    this.state.value=e.target.value
                    this.setState({})
                }}/>
                <Button type="dashed" onClick={this.inquire}>查询</Button>
                <Table columns={this.state.columns} dataSource={this.state.data} pagination={{defaultPageSize:5}}/>
            </div>
        )
    }
}
export default User