import React from 'react'
import {withRouter} from 'react-router-dom'
import './index.less'
class Token extends React.Component{
    render(){
        return(
            <div className='token-box'>
                <div className='token-box2'>
                    <p>登录过期,请重新登录</p><button onClick={()=>{
                        this.props.history.push('/login')
                    }}>去登录</button>
                </div>
            </div>
        )
    }
}
export default withRouter(Token)