import React from 'react';
import Head from '../components/head/head';
import Home from '../components/Home/Home';
import { HashRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';
import {Menu,Icon,Layout} from 'antd';
import Logout from '../components/logOut/logOut';
import Task from '../components/Task/Task';
import Eval from '../components/eval/eval';
import FeedBack from '../components/feedback/feedback';
import Charts from '../components/feedBackCharts/feedBackCharts';
import PropTypes from 'prop-types';
import EvalForm from '../components/evalForm/evalForm';
import ClassManager from '../components/classManager/classManager';
import ChangeConf from '../components/changeConf/changeConf';
import './public.css';

const SubMenu = Menu.SubMenu;

class NavBar extends React.Component{
  state={
    top:10,
    bottom:10
  }

	render(){
		return (
      <Menu mode="vertical" className='m-nav'>
  	  <SubMenu key="sub0" title={<Link to='/teacher'><span><Icon type="bank" /><span>首页</span></span></Link>}/>
      <SubMenu key="sub1" title={<span><Icon type="setting" /><span><Link to='/teacher/newTask'>发布任务</Link></span></span>}/>
      <SubMenu key="sub2" title={<span><Icon type="setting" /><span><Link to='/teacher/eval'>待评价</Link></span></span>}/>
      <SubMenu key="sub3" title={<span><Icon type="setting" /><span><Link to='/teacher/feedBack'>反馈</Link></span></span>}/>
      <SubMenu key="sub4" title={<span><Icon type="setting" /><span><Link to='/teacher/classManager'>班级管理</Link></span></span>} />
      <SubMenu key="sub5" title={<span><Icon type="setting" /><span><Link to='/teacher/changeConf'>更改配置</Link></span></span>}/>
  	  </Menu>
			);
	}
}

const TeacherPage = withRouter((props) => {
  return (
    <div>
    <Layout>
    <Head/>
    <NavBar/>
    <content style={{minHeight: 650}} className='g-board'>
    <Switch>
      <Route path='/teacher/changeConf' component={ChangeConf}/>
      <Route path='/teacher/classManager' component={ClassManager}/>
      <Route path='/teacher/evalForm' component={EvalForm}/>
      <Route path='/teacher/FeedBackCharts' component={Charts}/>
      <Route path='/teacher/feedBack' component={FeedBack}/>
      <Route path='/teacher/eval' component={Eval}/>
      <Route path='/teacher/newTask' component={Task}/>
      <Route path='/teacher' component={Home}/>
    </Switch>
    </content>
    <Logout/>
      </Layout>
    </div>
  );
});

class Page extends React.Component{
  constructor(props){
    super(props);
    this.state={
      authenticated:false
    }
  }

  static contextTypes = {
        store: PropTypes.object,
    };

  componentWillMount(){
    
  }

	render(){
		return(
			<Router>
			<TeacherPage />
			</Router>
			);
	}
}

// const mapStateToProps  = (state) => ({
  
// });

// const mapDispatchToProps=(dispatch)=>{
//   return {
//     initail(name,type,className,id){
//       var data={name:name,type:type,className:className,id:id}
//       dispatch({type:'REFRESH',data})
//     }
//   }
// }

export default Page;

