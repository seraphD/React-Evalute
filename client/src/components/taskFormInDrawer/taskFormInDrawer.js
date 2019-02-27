import React from 'react';
import {Button,Icon,Upload,message} from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';

const Dragger = Upload.Dragger;

let fileList=[];

const props = {
  name: 'file',
  multiple: true,
  action: 'http://localhost:4000/upload',
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

class TaskForm extends React.Component{
  constructor(props){
    super(props);
    this.state={
      updateFinish:false
    }
  }

  static contextTypes ={
    store:PropTypes.object,
  }

  onclick=()=>{
    let data=this.context.store.getState();
    if(fileList.length=='3'){
    axios.post('http://localhost:4000/upload-finish',{fileList:fileList,name:data.name})
    .then((response)=>{
        this.setState({

        })
    })
  }else{
      message.error('偷懒???');
  }
  }
	render(){
		return(
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
  				<Button type='primary' className='submit' onClick={this.onclick}>提交
          </Button>
			</div>
			)
	}
}

export default TaskForm;