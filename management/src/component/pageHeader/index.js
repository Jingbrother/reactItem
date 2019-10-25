import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import { PageHeader } from 'antd'

const routes = [
    {
      path: '/admin/home',
      breadcrumbName: '首页',
    },

    
  ];
  
  class Header extends Component{
      
      render(){
          return(
            <div className='header'>
           <PageHeader
                style={{height:70}}
                breadcrumb={ { routes} }
                />   
            </div>
          )
      }
  }

  export default withRouter(Header)