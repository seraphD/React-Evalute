import React from 'react';
import {Modal,Button,Card,Icon,Upload,message,Form,Drawer} from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';
import {connect} from 'react-redux';
import $ from 'jquery';
import './taskDetail.css';
import config from '../../config/config';

const props = {
  name: 'file',
  multiple: true,
  action: `${config.basicURL_S}/upload`,
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      fileList.push(info.file.name);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  id:'drawerUpload'
};

const Dragger = Upload.Dragger;

let fileList=[];
class TaskCard extends React.Component{
	constructor(props){
		super(props);
		this.state={
			ModalVisible:[],
			DrawerVisible:[],
			taskList:[],
      t:0
		}
	}

	static contextTypes ={
		store:PropTypes.object,
	}

	showModal=(e)=>{
		let v=this.state.ModalVisible;
		let i=e.target.getAttribute('id');
		v[i]=true;
		this.setState({
			ModalVisible:v
		})
	}

	handleCancel=(e)=>{
		let v=this.state.ModalVisible;
		let i=e.target.getAttribute('id');
		v.splice(i,1,false);
		this.setState({
			ModalVisible:v
		})
	}

	showDrawer = (e) => {
		let v=this.state.DrawerVisible;
		let i=e.target.getAttribute('id');
		v[i]=true;
		this.setState({
			DrawerVisible:v
		})
  	}

  	onClose = (e) => {
    let v=this.state.DrawerVisible;
		let i=e.target.getAttribute('id');
		v.splice(i,1,false);
		this.setState({
			DrawerVisible:v
		})

		fileList=[];
  	}

  	onclick=(e)=>{
    	let data=this.context.store.getState();
    	let i=e.target.getAttribute('id');
    	if(fileList.length===3){
    		axios.post(`${config.basicURL_S}/upload-finish`,{id:data.id,fileList:fileList,name:data.name,title:this.props.taskList[i].title})
    		.then((response)=>{
        		let v=this.state.DrawerVisible;
				    v.splice(i,1,false);
				    this.setState({
					     DrawerVisible:v
				    })
            $(`.uploadBtn.${i}`).attr('disabled','disabled');
    		}).then(()=>{
          //title,teacher,name,className,size
          this.props.distribute(this.props.taskList[i].title,this.props.taskList[i].teacher,data.id,data.className);
        }).then(()=>{
          let newTask=this.props.taskList;
          newTask[i].submit=1;
          this.setState({
            taskList:newTask
          })
        })
  		}else if(fileList.length<3){
      		message.error('偷懒???');
  		}
  		fileList=[];
  	}

	componentWillMount(){
    let data=this.context.store.getState();
    this.props.getAllTask(data.name,data.className,data.id);
	}

	render(){
		return(
			<div className='g-main'>
			{
        this.props.taskList?this.props.taskList.map((item,i)=>{
         return(
          <Card
          title={`${item.title}`}
          extra={<Button type='primary' size="small"  id={i} onClick={this.showModal}>详情</Button>}
          key={i}
          id='u-task-card'
        >
          <p>发布教师：{`${item.teacher}`}</p>
          <p>截止时间：{`${item.date}`}</p>
          <div className='m-status'>
            {item.submit?item.eval_result?<p className='u-point'>{item.eval_result}</p>:<p className='u-point'>待</p>:<p></p>}
          </div>
          <Button type='primary' className={`u-upload-btn ${i}`} onClick={this.showDrawer} id={i} disabled={item.submit?`disabled`:0}>
            <Icon type='upload'/>上传作业
          </Button>
          
          <Drawer
            title="提交作业"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.DrawerVisible[i]}
            width={600}
            maskClosable={false}
          >
          <div>
          <Dragger {...props} >
            <p className="ant-upload-drag-icon">
              <Icon type="file-word" theme="outlined" />
            </p>
            <p className="ant-upload-text">文档</p>
          </Dragger>

          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <Icon type="file-ppt" theme="outlined" />
            </p>
            <p className="ant-upload-text">PPT</p>
          </Dragger>

          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">视频</p>
          </Dragger>
          <Button id={i} type='primary' className='u-submit' onClick={this.onClose}>返回</Button>
          <Button id={i} type='primary' className='u-submit' onClick={this.onclick}>提交</Button>
          </div>
          </Drawer>

          <Modal
          title={item.title}
          visible={this.state.ModalVisible[i]}
          footer={
            <Button id={i} onClick={this.handleCancel}>返回</Button>
          }
          id={i}
          >
          <p>{item.detail}</p>
          </Modal>
          </Card>
          )
        }):<div></div>
        }
  		</div>
		)
	}
}


const mapStateToProps  = (state) => ({
  taskList:state.taskList,
  finish:state.finish
});

const mapDispatchToProps=(dispatch)=>{
  return {
    getAllTask(name,className,id){
      var data={name:name,class:className,id:id}
      dispatch({type:'GET_ALL_TASK',data})
    },
    distribute(title,teacher,name,className){
      var data={title:title,teacher:teacher,name:name,className:className}
      dispatch({type:'DISTRIBUTE',data});
    },
    initail(name,type,className){
      var data={name:name,type:type,className:className}
      dispatch({type:'REFRESH',data})
    }
  }
}

const TaskDetail = Form.create()(TaskCard);

export default connect(mapStateToProps,mapDispatchToProps)(TaskDetail);
