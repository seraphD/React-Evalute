import React from 'react';
import {Button,Card,Form} from 'antd';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './eval.css';

class Eval extends React.Component{
	constructor(props){
		super(props);
		this.state={
			cardList:[]
		}
	}

	static contextTypes ={
    	store:PropTypes.object,
    	router:PropTypes.object.isRequired,
  	}

	componentWillMount(){
		let data=this.context.store.getState();
		this.props.getEvalTask(data.id);
	}

	onClick=(e)=>{
		let data=this.context.store.getState();
		let evalTask=this.props.eval_task_list[e.target.getAttribute('id').split(' ')[1]];
		this.props.startEval(data.name,evalTask.title,evalTask.submit,data.id);
		if(data.type==='s'){
			data=this.context.store.getState()
			localStorage.setItem('evalNow_name',data.id);
			localStorage.setItem('evalNow_title',data.evalNow.title);
			localStorage.setItem('evalNow_submit',data.evalNow.submit);
			this.context.router.history.push('/student/evalForm');
		}else{
			this.context.router.history.push('/teacher/evalForm');
		}
	}

	render(){
			return(
			<div className='g-main'>
			 {
			 	this.props.eval_task_list?this.props.eval_task_list.map((item,i)=>{
				let doc_url=`/upload/word/${item.doc_url}`;
				let ppt_url=`/upload/ppt/${item.ppt_url}`;
				let video_url=`/upload/video/${item.video_url}`;
				if(item.doc_url && item.ppt_url && item.video_url){
				return(
				<Card
				title={item.title}
   				key={i}
   				id='u-task-card'
				>
				<p>提交者：{item.submit}姓名：{item.name}</p>
				<a href={doc_url} download><p>doc</p></a>
				<a href={ppt_url} download><p>ppt</p></a>
				<a href={video_url} download><p>video</p></a>
				<Button type='primary' className='u-eval-btn' id={`eval-Btn ${i}`} onClick={this.onClick}>Eval>></Button>
				</Card>
					)
				}else return <div></div>
				}):<div></div>
			 }
			</div>
			)
	}
}

const mapStateToProps  = (state) => ({
  eval_task_list:state.eval_task_list,
  evalNow:state.evalNow
});

const mapDispatchToProps=(dispatch)=>{
  return {
    getEvalTask(name){
      var data = { name:name  }
      dispatch({type:'GET_EVAL_TASK', data });
    },
    startEval(name,title,submit,id){
    	var data={name:name,title:title,submit:submit,id:id}
    	dispatch({type:'START_EVAL',data});
    },
    initail(name,type,className){
		var data={name:name,type:type,className:className}
		dispatch({type:'REFRESH',data})
	}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Eval);