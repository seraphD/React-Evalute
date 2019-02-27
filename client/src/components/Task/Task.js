import React from 'react';
import {Tabs} from 'antd';
import NewTask from '../newTask/newTask.js';
import TaskTable from '../table/table';
const TabPane = Tabs.TabPane;

class TaskPage extends React.Component{
	render(){
		return(
			<div className='g-main'>
			<div className='m-tabs'>
			<Tabs defaultActiveKey="1">
    			<TabPane tab="发布新任务" key="1" className='tabPane'><NewTask/></TabPane>
    			<TabPane tab="查看我发布的任务" key="2" className='tabPane'><TaskTable/></TabPane>
  			</Tabs>
  			</div>
  			</div>
		)
	}
}

export default TaskPage;