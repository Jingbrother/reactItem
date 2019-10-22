import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Menu} from 'antd'
import './index.less'


let navData=[
    {name:'首页',path:'/admin/home'},
    {name:'用户管理',
     path:'/admin/user',
     children:[
         {name:'用户添加',path:'/admin/user/add'},
         {name:'用户查看',path:'/admin/user/all'},
     ]
    },
    {name:'电影管理',
     path:'/admin/movie',
     children:[
         {name:'电影添加',path:'/admin/movie/add'},
         {name:'电影查看',path:'/admin/movie/all'},
     ]
    }
]
const { SubMenu } = Menu;

class CustomNav extends Component{
    jump=(path)=>{
        this.props.history.push(path)
    }
    renderItem=(data)=>{
        return data.map((item,index)=>{
            if(item.children){
                return(
                    <SubMenu style={{height:50}} title={item.name}>{this.renderItem(item.children)}</SubMenu>
                )
            }else{
                return <Menu.Item style={{background:'rgb(20, 52, 65)',color:'#fff'}} onClick={this.jump.bind(this,item.path)}>{item.name}</Menu.Item>
            }
        })
    }
    render(){
        return(
            <div className='customNav'>
                <Menu  style={{width:255,height:0,color:'#fff'}} mode="vertical">
                    {this.renderItem(navData)}

                </Menu>
            </div>
        )
    }
}
export default withRouter(CustomNav)