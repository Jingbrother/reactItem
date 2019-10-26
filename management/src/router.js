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

const UserAdd = ComponentImport(()=>import('./component/user/useradd'))
const MovieAdd = ComponentImport(()=>import('./component/movieAdd'))
const User = ComponentImport(()=>import('./component/user/index'))
const Movieall = ComponentImport(()=>import('./component/movie111/movieall'))
const Hot = ComponentImport(()=>import('./component/show'))
const Soldout = ComponentImport(()=>import('./component/soldout'))

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
                                <Route path='/admin/user/add' component={UserAdd}></Route>
                                <Route path='/admin/movie/add' component={MovieAdd}></Route>
                                <Route path='/admin/movie/all' component={Movieall}></Route>
                                <Route path='/admin/movie/show' component={Hot}></Route>
                                <Route path='/admin/movie/soldout' component={Soldout}></Route>
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
