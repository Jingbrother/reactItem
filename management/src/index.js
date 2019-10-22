import React,{Component} from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import './style/reset.less'
import 'antd/dist/antd.css'
import Router from './router'
// import axios from './utils/axios'
import * as serviceWorker from './serviceWorker';

// Component.prototype.$axios=axios
ReactDOM.render(<Router />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
