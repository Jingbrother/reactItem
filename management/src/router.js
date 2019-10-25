import React,{Component} from 'react'
import ComponentImport from './utils/componentImport'
import {HashRouter,Switch,Redirect,Route} from 'react-router-dom'
const Login = ComponentImport(()=>import('./component/login'))
const Admin = ComponentImport(()=>import('./component/admin'))
const Home = ComponentImport(()=>import('./component/home'))
const UserAdd = ComponentImport(()=>import('./component/user/useradd'))
const User = ComponentImport(()=>import('./component/user/index'))
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
                                <Route path='/admin/user/add' component={UserAdd}></Route>
                                <Route path='/admin/movie' component={Movie}></Route>
                            </Admin>
                        )
                    }}></Route>
                </Switch>
            </HashRouter>
        )
    }
}

export default Router
