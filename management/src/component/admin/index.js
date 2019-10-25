import React,{Component} from 'react'
import CustomNav from '../customNav/index'
import Header from '../pageHeader/index'
import actionCreator from '../../store/actionCreator'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import './index.less'
class Admin extends Component{
    componentDidMount(){
        if(localStorage.getItem('token')){
            this.props.changeTokenModal(false)
        }else{
            this.props.changeTokenModal(true)
        }
    }
    render(){
        return(
            <div className='admin'>
                <div className='admin-nav'>
                    <div className='logo'>
                        MY LOGO
                    </div>
                    <CustomNav></CustomNav>
                </div>
                <div className='admin-content'>
                    <div className='admin-content-top'>
                        <Header></Header>
                    </div>
                    <div className='admin-content-center'>
                        {this.props.children}
                    </div>
                    <div className='admin-content-bottom'>
                        ©版权所有
                    </div>
                </div>

            </div>
        )
    }
}
let mapDispathToprops=(dispatch)=>{
    return bindActionCreators(actionCreator,dispatch)
}
export default connect(state=>state,mapDispathToprops)(Admin)