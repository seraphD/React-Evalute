import React from 'react';
import {Button,Row, Col,Drawer,Form,Input,DatePicker,TreeSelect } from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';
import './table.css';
import config from '../../config/config';

const FormItem = Form.Item;
const {TextArea} = Input;
const { RangePicker} = DatePicker;
const treeData=[]

class TaskTable extends React.Component{
  constructor(){
    super();
    this.state={
      taskList:[],
      visible:false,
      classValue:undefined
    }
  }

  onClick=()=>{
    
  }

  static contextTypes = {
    store: PropTypes.object,
  };

  getTask(){
    const store=this.context.store.getState();
    axios.get(`${config.basicURL_T}/myTask?teacher=${store.name}`)
    .then((response) =>{
      let task=response.data.task;
      var taskTable=[];
      for(var value of task){
        taskTable.push({
          key:taskTable.length+1,
          name:value.title,
          time:value.date_e,
          className:value.class,
          detail:value.detail
        })
      }
      this.setState({
        taskList:taskTable
      })
    } );
  }

  componentWillMount(){
    this.getTask();
  }

  showDrawer = (e) => {
    let id=e.target.getAttribute('id')
    let edit=this.state.taskList[id];
    let data=this.context.store.getState();
    axios.post(`${config.basicURL_T}/myClass`,{name:data.name})
    .then((response)=>{
      let className=response.data.split(',');
      for(var i=0;i<className.length;i++){
        treeData.push({
          title:`${className[i]}`,
          value:`${className[i]}`,
          key:`${className[i]}`
        })
      }
    })
    .then(()=>{
    this.setState({
      visible: true,
      editTitle:edit.name,
      editDetail:edit.detail,
      editClass:edit.className,
      editTime:edit.time,
      treeData:treeData
    });
    })
  }

  onClose = (e) => {
    this.setState({
      visible: false,
    });
  }

  onChange=(value)=> {
    this.setState({ value });
  }

  onsubmit=(e)=>{
    e.preventDefault();
    let data=this.context.store.getState();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let info={title:values.title,detail:values.detail,className:values.className,time:values.time};
        axios.post(`${config.basicURL_T}/updateTask`,
          {title:this.state.editTitle,className:this.state.editClass,teacher:data.name,info:info})
        .then((response)=>{
          this.getTask();
        })
      }
    });
    this.props.form.resetFields();
    this.setState({
      visible:false
    })
  }

	render(){
    const { getFieldDecorator } = this.props.form;
		return(
			<div>
      <Row type="flex" justify="space-between" className='u-task-row'>
      <Col span={4}>名称</Col>
      <Col span={4}>截止时间</Col>
      <Col span={4}>班级</Col>
      <Col span={4}>编辑</Col>
      </Row>
      {this.state.taskList.map((item,i)=>{
        return(
          <Row type="flex" justify="space-between" key={i} className='u-task-row'>
          <Col span={4}>{item.name}</Col>
          <Col span={4}>{item.time}</Col>
          <Col span={4}>{item.className}</Col>
          <Col span={4}><Button type='primary' id={i} onClick={this.showDrawer}>更改</Button></Col>
          </Row>
          )
      })}
      <Drawer
          title="修改任务"
          width={720}
          placement="right"
          onClose={this.onClose}
          maskClosable={true}
          visible={this.state.visible}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
          }}
      >
      <Form>
      <p>任务名称</p>
      <FormItem>
      {getFieldDecorator('title', {
            initialValue: this.state.editTitle,
            rules: [{ required: true, message: 'Please input title!', }],
          })(
            <Input/>
          )}
      </FormItem>
      <p>任务细节</p>
      <FormItem>
      {getFieldDecorator('detail', {
            initialValue: this.state.editDetail,
            rules: [{ required: true, message: 'Please input title!', }],
          })(
            <TextArea rows='10' id='detail'/>
          )}
      </FormItem>
      <p>选择班级</p>
      <FormItem>
      {getFieldDecorator('className', {
            initialValue: this.state.editClass,
            rules: [{ required: true, message: 'Please input className!', }],
          })(
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
      <p>选择时间</p>
      <FormItem>
      {getFieldDecorator('time', {
            rules: [{ required: true, message: 'Please input title!', }],
          })(
            <RangePicker/>
          )}
      </FormItem>
      <Button type='primary' htmlType='submit' onClick={this.onsubmit}>提交更改</Button>
      </Form>
      </Drawer>
			</div>
		)
	}
}

export default Form.create()(TaskTable);



