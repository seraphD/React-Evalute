import React from 'react';
import XLSX from 'xlsx';
import { Table,Modal,Form,Tabs,Button,Input } from 'antd';
import axios from 'axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './classManager.css';
import config from '../../config/config';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
let dataSource=[[],[],[],[],[],[],[],[]];
const props = {
  name: 'file',
  action: `${config.basicURL_T}/addStudent`,
  headers: {
    authorization: 'authorization-text',
  },
};
let importedStudents=[];

const columns = [{
  title: 'Id',
  dataIndex: 'id',
  key: 'id',
}, {
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}];

class ClassManager extends React.Component{
	state = { visible: false,studentList:[] }

	static contextTypes ={
    	store:PropTypes.object,
    	router:PropTypes.object.isRequired,
  	}

	componentWillMount(){
		let data=this.context.store.getState();
		this.props.myClass(data.name);
		if(this.timer){
			clearTimeout(this.timer);
		}
		this.timer=setTimeout(()=>{this.fillTable()},300);
	}

	fillTable(){
    let data=this.context.store.getState()
		if(data.className!=='undefined'){
			console.log(data.className);
      data.className.map((item,i)=>{
      axios.post(`${config.basicURL_T}/getStudent`,{className:item})
      .then((response)=>{
        dataSource[i].length=0;
        if(typeof(response)!=='undefined'){
          let students=response.data;
          for(var j=0;j<students.length;j++){
            dataSource[i].push({
              key:j,
              id:students[j].id,
              name:students[j].name
            })
          }
        }
      })
      .then(()=>{
        this.setState({
          finish:1
        })
      })
    })
    }
	}

	showModal=(e)=>{
		this.setState({
			visible:true
		})
	}

	handleOk=(e)=>{
		e.preventDefault();
		let data=this.context.store.getState();
		this.props.form.validateFields((err,values)=>{
			if(!err){
				console.log('Received values of form: ', values);
				axios.post(`${config.basicURL_T}/addStudent`,{className:values.className,students:importedStudents,name:data.id})
				.then(()=>{
					this.props.myClass(data.id);
				})
				.then(()=>{
					dataSource=[[],[],[],[],[],[],[]];
					if(this.timer){
						clearTimeout(this.timer);
					}
					this.timer=setTimeout(()=>{this.fillTable()},100);
				})
				.then(()=>{
					this.setState({
						visible:false
					})
				})
			}
		})
		this.props.form.resetFields();
		importedStudents=[];
	}

	handleCancel=(e)=>{
		this.props.form.resetFields();
		importedStudents=[];
		this.setState({
			visible:false
		})
	}

	importExcel=(file)=>{
      const { files } = file.target;
    	const fileReader = new FileReader();
    	fileReader.onload = event => {
      		try {
        		const { result } = event.target;
        		const workbook = XLSX.read(result, { type: 'binary' });
        		let data = []; 
        		for (const sheet in workbook.Sheets) {
          			if (workbook.Sheets.hasOwnProperty(sheet)) {
           				data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
          			}
        		}
           	for(var i=0;i<data.length;i++){
        			importedStudents.push({
        				key:i,
        				id:data[i].id,
        				name:data[i].name,
        				pwd:data[i].password
        			})
        			if(i===data.length-1){
        				this.setState({
        					finish:1
        				})
        			}
        		}
      		} catch (e) {
        	console.log('文件类型错误');
        	return;
      		}
    	};
    	fileReader.readAsBinaryString(files[0]);
  }

	render(){
		const { getFieldDecorator } = this.props.form;
		return(
			<div className='g-main'>
			<div className='m-tabs'>
			<Form layout="vertical">
			<Tabs tabBarExtraContent={<Button type='primary' onClick={this.showModal}>添加班级</Button>} className='m-class-manage-tab'>
            { this.props.myclass?this.props.myclass.map((item,i)=>{
            	return ( 
                	<TabPane tab={item} key={i}>
                  		<Table dataSource={dataSource[i]} columns={columns}/>
                	</TabPane>
               	)
            }):<TabPane tab={'1'} key={0}></TabPane>}
         	</Tabs>
			</Form>
			<Modal
          		visible={this.state.visible}
          		title="Title"
          		onOk={this.handleOk}
          		onCancel={this.handleCancel}
          		footer={[
            	<Button key="back" onClick={this.handleCancel}>取消</Button>,
            	<Button key="submit" type="primary" onClick={this.handleOk} htmlType='submit'>
              	确认提交
            	</Button>,
          		]}
        	>
          	<Form>
          	<FormItem>
          	<p>班级名称</p>
          	{getFieldDecorator('className', {
            	rules: [{ required: true, message: 'Please input your Password!' }],
          	})(
            	<Input type="text" />
          	)}
        	</FormItem>
        	<p>学生列表</p>
        	{getFieldDecorator('studentList')(
          		<Input type='file' accept='.xlsx, .xls' onChange={this.importExcel} />
          	)}
        	<FormItem>
          	<Table columns={columns} dataSource={importedStudents} size="small" />
        	</FormItem>
          	</Form>
        	</Modal>
			</div>
			</div>
			)
	}
}

const mapStateToProps  = (state) => ({
  myclass:state.className
});

const mapDispatchToProps=(dispatch)=>{
  return {
    myClass(name){
    	let data={name:name}
    	dispatch({type:'MYCLASS',data})
    },
  }
}

export default  Form.create()(connect(mapStateToProps,mapDispatchToProps)(ClassManager))
