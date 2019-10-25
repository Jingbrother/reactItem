import React,{Component} from 'react'
import ComponentImport from './utils/componentImport'
import {HashRouter,Switch,Redirect,Route} from 'react-router-dom'
import Token from './component/token'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ActionCreator from './store/actionCreator'
const Login = ComponentImport(()=>import('./component/login'))
const Admin = ComponentImport(()=>import('./component/admin'))
const Home = ComponentImport(()=>import('./component/home'))
const User = ComponentImport(()=>import('./component/user'))
const Movie = ComponentImport(()=>import('./component/movie'))

class Router extends Component{
    render(){
        return(
            <HashRouter>
                <Switch>
                    <Redirect exact from='/' to='/login'></Redirect>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/admin' render={()=>{
                        return(
                            <Admin>
                                <Route path='/admin/home' component={Home}></Route>
                                <Route path='/admin/user/all' component={User}></Route>
                                <Route path='/admin/movie' component={Movie}></Route>
                                {this.props.tokenModal?<Token></Token>:''}
                            </Admin>
                        )
                    }}></Route>
                </Switch>
            </HashRouter>
        )
    }
}
let mapDispathToprops=(dispatch)=>{
    return bindActionCreators(ActionCreator,dispatch)
}
export default connect(state=>state,mapDispathToprops)(Router)
