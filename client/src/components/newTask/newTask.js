import React from 'react';
import {Form,Input,TreeSelect,Button,DatePicker,message } from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from'axios';
import './newTask.css';
import config from '../../config/config';
import {NEWTASK} from '../../reducers/index';

const { RangePicker} = DatePicker;
const {TextArea} = Input;
const FormItem=Form.Item;
let treeData=[
];

class NewTask extends React.Component{
	constructor(props){
		super(props);
		this.state={
			title:'',
			context:'',
			select:[],
			time:[],
			finish:0,
			treeData:[],
			classValue:[]
		}
	}

	static contextTypes = {
        store: PropTypes.object,
    };

	setclass(value){
		this.setState({select:value});
	}
	setTime(date,dateString){
		this.setState({time:dateString});
	}

	getClass(name){
		axios.post(`${config.basicURL_T}/myClass`,{name:name})
		.then((response)=>{
			let className=response.data.split(',');
			for(var i=0;i<className.length;i++){
				treeData.push({
					title:className[i],
					value:className[i],
					key:className[i]
				})
				if(i===className.length-1){
					this.setState({
						treeData:treeData
					})
				}
			}
		})
	}

	componentWillMount(){
		let data=this.context.store.getState();
		treeData.length=0;
		this.getClass(data.id);
	}

	refresh=()=>{
		this.setState({
			finish:1
		})
	}

	handleSubmit=(e)=>{
		e.preventDefault();
		const data=this.context.store.getState();
		this.props.form.validateFields((err,values)=>{
			console.log(values);
			if(!err){
				this.props.newTask({
					title:values.title,
					detail:values.detail,
					className:values.classSelect,
					time_s:this.state.time[0],
					time_e:this.state.time[1],
					name:data.id,
				})
			}
			message.success('提交成功！！');
			this.props.form.resetFields();
		})
	}

	onChange=(value)=> {
    	this.setState({ value });
  }

	render(){
		const { getFieldDecorator } = this.props.form;
		return(
			<div>
			<Form onSubmit={this.handleSubmit}>
			任务名称:
			<FormItem>
			{getFieldDecorator('title',{
				rules:[{required:true,message:'请输入任务名称！'}],
			})(
			<Input/>
			)}
			</FormItem>
			任务描述：
			<FormItem>
			{getFieldDecorator('detail',{
				rules:[{required:true,message:'请输入任务要求！'}],
			})(
			<TextArea rows='10'/>
			)}
			</FormItem>
			选择班级:<br/>
			<FormItem>
			{getFieldDecorator('classSelect')(
				<TreeSelect
            	style={{ width: 300 }}
            	value={this.state.classValue}
            	dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            	treeData={this.state.treeData}
            	placeholder="Please select"
            	treeDefaultExpandAll
            	onChange={this.onChange}
            	multiple
            	allowClear
           		/>
			)}
			</FormItem>
			有效时间：
			<FormItem>
			{getFieldDecorator('validTimeRange',{
				rules:[{required:false}],
			})(
			<RangePicker onChange={this.setTime.bind(this)} />
			)}
			</FormItem>
			<Button type='primary' htmlType='u-submit' className='login-form-button submt'>提交</Button>
			</Form>
			</div>
			)
	};
}

function mapStateToProps(state){
  return {
    success:state.success
  }
}

const mapDispatchToProps = (dispatch) => ({
    newTask:bindActionCreators(NEWTASK,dispatch),
    initail(name,type,className){
		var data={name:name,type:type,className:className}
		dispatch({type:'REFRESH',data})
	}
});

const wrappedNewTask=Form.create()(connect(mapStateToProps, mapDispatchToProps)(NewTask));

export default wrappedNewTask;