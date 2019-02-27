import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export default function (ComposedComponent){
	class Authentication extends React.Component{
		static contextTypes={
			router:PropTypes.object
		}

		componentWillMount(){
			let user=localStorage.getItem('user');
			if(!this.props.authenticated){
				if(user==null){
					this.context.router.history.push('/');
				}else{
					let name=localStorage.getItem('user');
      				let className=localStorage.getItem('className');
      				let id=localStorage.getItem('id');
      				let type=localStorage.getItem('type');
      				this.props.initail(name,type,className,id);
				}
			}
		}

		render(){
			return <ComposedComponent {...this.props}/>
		}
	}

	function mapStateToProps(state){
		return {authenticated:state.authenticated}
	}

	function mapDispatchToProps(dispatch){
		return {
			initail(name,type,className,id){
				var data={name:name,type:type,className:className,id:id}
				dispatch({type:'REFRESH',data})
			}
		}
	}

	return connect(mapStateToProps,mapDispatchToProps)(Authentication);
}