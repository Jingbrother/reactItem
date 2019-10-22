import React,{Component} from 'react'
import CustomNav from '../customNav/index'
import Header from '../pageHeader/index'
import './index.less'
class Admin extends Component{
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
                </div>

            </div>
        )
    }
}
export default Admin