import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Card,Button} from 'antd';
import axios from 'axios';
import './feedback.css';
import config from '../../config/config';

class FeedBack extends React.Component{
	static contextTypes = {
        store: PropTypes.object,
        router:PropTypes.object.isRequired,
    };

	componentWillMount(){
		let data=this.context.store.getState();
		this.setState({
    		name:data.name,
    		type:'t'
    	})
    	axios.get(`${config.basicURL_T}/myTask?teacher=${data.name}`)
    	.then((response)=>{
    		this.setState({
    			myTask:response.data.task
    		})
    	})
	}

	jump(){
		let data=this.context.store.getState();
		localStorage.setItem('chartsData',JSON.stringify(data.chartsData));
		this.context.router.history.push('/teacher/FeedBackCharts');
	}

	onCLick=(e)=>{
		let id=e.target.getAttribute('id');
		let task=this.state.myTask[id];
		this.props.checkCharts(task);
		
		if(this.timer){
			clearTimeout(this.timer);
		}
		this.timer=setTimeout(()=>{this.jump()},100);
	}

	render(){
		return(
			<div className='g-main'>
			{typeof(this.state.myTask)!=='undefined'?this.state.myTask.map((item,i)=>{
				return(
					<Card
					title={`${item.title}`}
					id='u-task-card'
          			key={i}
					>
					<p>班级:{item.class}</p>
					<Button type='primary' className='u-chart-btn' id={`${i}`} onClick={this.onCLick}>图表</Button>
					</Card>
					)
			}):<div></div>}
			</div>
			)
	}
}

const mapStateToProps=(state)=>({
	name:state.name,
	feedBack:state.feedBack
})

const mapDispatchToProps=(dispatch)=>{
	return{
		initail(name,type,className){
			var data={name:name,type:type}
			dispatch({type:'REFRESH',data})
		},
		getFeedBack(name){
			var data={name:name};
			dispatch({type:'GET_FEED_BACK',data});
		},
		checkCharts(task){
			var data={task:task};
			dispatch({type:'CHECK_CHARTS',data});
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(FeedBack);