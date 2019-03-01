import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Home extends React.Component{

 	static contextTypes = {
        store: PropTypes.object,
    };

    componentWillMount(){
    	let data=this.context.store.getState();
        if(data.type==='s'){
            this.setState({
                name:data.name,
                className:data.className
            })
        }else{
            this.setState({
                name:data.name,
            })
        }
    }

	render(){
		return(
			<div className='main'>
			<h1>Greetings, {this.state.name}!</h1>
			<h1 id='news'>Here are some news for you:</h1>
			<h1 id='interests'>May be you are interested:</h1>
			</div>
			);
	}
}

const mapStateToProps=(state)=>({
	name:state.name,
	className:state.className
})

const mapDispatchToProps=(dispatch)=>{
	return{
		initail(name,type,className){
			var data={name:name,type:type,className:className}
			dispatch({type:'REFRESH',data})
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
