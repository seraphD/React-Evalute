import React from 'react';
import Head from '../components/head/head.js';
import TaskDetail from '../components/taskDetail/taskDetail';
import Eval from '../components/eval/eval.js';
import EvalForm from '../components/evalForm/evalForm.js';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import {Menu,Icon,Layout} from 'antd';
import Logout from '../components/logOut/logOut';
import PropTypes from 'prop-types';
import './public.css';

const SubMenu = Menu.SubMenu;
const { Footer } = Layout;

class NavBar extends React.Component{
	render(){
		return (
		<Menu mode="vertical" className='m-nav'>
    	<SubMenu key="sub1" title={<span><Icon type="appstore" /><span><Link to='/student/taskDetail'>查看任务</Link></span></span>}/>
    	<SubMenu key="sub2" title={<span><Icon type="appstore" /><span><Link to='/student/eval'>待评价</Link></span></span>}/>
  		</Menu>
			);
	}
}

class Student extends React.Component{
	render(){
		return(
			<div>
			<Layout>
			<Head/>
			<NavBar/>
			<content style={{minHeight: 650}} className='g-board'>
			<Switch>
				<Route path='/student/evalForm' component={EvalForm}/>
				<Route path='/student/eval' component={Eval}/>
				<Route path='/student/taskDetail' component={TaskDetail}/>
			</Switch>
			<Footer style={{ textAlign: 'center' }} className='foot'>
     			Zlh Design ©2018 Created by Zhang Lihui
    		</Footer>
			</content>
			<Logout/>
			</Layout>
			</div>
			);
	}

}

class StudentPage extends React.Component{
	static contextTypes ={
    	store:PropTypes.object,
  	}
	
	componentWillMount(){
		
	}

	render(){
		return(
			<Router>
			<Student/>
			</Router>
			);
	}
}

export default StudentPage;