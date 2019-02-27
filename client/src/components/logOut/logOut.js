import React from 'react';
import {Button,Menu, Dropdown,Avatar} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './logOut.css';

class LogOut extends React.Component{
	static contextTypes ={
		store: PropTypes.object,
    	router:PropTypes.object.isRequired,
  	}

	logout=()=>{
		localStorage.clear();
		this.props.logOut();
		this.context.router.history.push('/')
	}
	
	render(){
		const data=this.context.store.getState();
		return(
			<div className='log-out'>
			<Dropdown overlay={
				<Menu>
    				<Menu.Item>
      				<Button className='log-out-btn'>修改密码</Button>
    				</Menu.Item>
    				<Menu.Item>
      				<Button onClick={this.logout} className='log-out-btn'>退出</Button>
    				</Menu.Item>
  				</Menu>}>
    			<Avatar size='large' icon="user" />
 			 </Dropdown>
 			 <p className='log-out-info'>{data.name}</p>
 			 </div>
			)
	}
}

const mapStateToProps=()=>({

})

const mapDispatchToProps=(dispatch)=>{
	return{
		logOut(){
			dispatch({type:'LOGOUT'})
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(LogOut);