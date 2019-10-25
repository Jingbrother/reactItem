import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import { PageHeader } from 'antd'
import './index.less'

const routes = [
    {
      path: '/home',
      breadcrumbName: '首页',
    },
    {
      path: '/admin/user',
      breadcrumbName: 'Second-level Menu',
    },
    {
        path: 'first',
        breadcrumbName: 'Second-level Menu',
    },
    
  ];
  
  class Header extends Component{
      
      render(){
          return(
           <PageHeader
                style={{
                    
                }}
                breadcrumb={ { routes} }
               
            />   
          )
      }
  }

  export default withRouter(Header)