import React from 'react';
import {Form,Input,Button,message,Tabs,InputNumber, Popconfirm,Table} from 'antd';
import axios from 'axios';
import './changeConf.css';
import config from '../../config/config';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
let data=[];
let PageConf=[];

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Please Input ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class EditableTable extends React.Component{
	constructor(props) {
    super(props);
    this.state = { data, editingKey: ''};
    this.columns = [
      {
        title: '大类',
        dataIndex: 'table_name',
        width: '20%',
        editable: true,
      },
      {
        title: '小类',
        dataIndex: 'item_title',
        width: '15%',
        editable: true,
      },
      {
        title: '内容',
        dataIndex: 'item_content',
        width: '35%',
        editable: true,
      },
      {
        title: '分值',
        dataIndex: 'item_point',
        width: '10%',
        editable: true,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        href="javascript:;"
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                      >
                        Save
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={() => this.cancel(record.key)}
                  >
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) : (
              	<div>
                <a onClick={() => this.edit(record.key)}>Edit</a>/
                <a onClick={() => this.delete(record.key)}>Delete</a>
                </div>
              )}
            </div>
          );
        },
      },
    ];
  }

  isEditing = (record) => {
    return record.key === this.state.editingKey;
  };

  edit(key) {
    this.setState({ editingKey: key });
  }

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        axios.post(`${config.basicURL_T}/updateEvalForm`,{item:newData[index]});
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  delete(key){
  	const newData = [...this.state.data];
    const index = newData.findIndex(item => key === item.key);
    if(index>-1){
    	newData.splice(index, 1);
    	this.setState({ data: newData });
    	axios.post(`${config.basicURL_T}/DeleteEvalForm`,{key:index})
    }
  }

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
    <div>
    <Button type='primary' className='u-add-row'>添加</Button>
      <Table
        components={components}
        bordered
        dataSource={this.state.data}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
        	simple:1,
        	pageSizeOptions:['12','5','5','10'],
        }}
      />
   	</div>
    );
  }
}

class ChangeConf extends React.Component{
	constructor(){
		super();
		this.state={
			size:0,
			self:0,
			teacher:0,
			students:0
		}
	}

	componentWillMount(){
		let evalList=[];
		axios.post(`${config.basicURL}/getConf`)
		.then((response)=>{
			let data=response.data;
			this.setState({
				size:data.size,
				self:data.r1,
				teacher:data.r2,
				students:data.r3
			})
		});
		axios.post(`${config.basicURL}/getEvalForm`)
		.then((response)=>{
			for(var i=0;i<10;i++) {
            	evalList.push({ id: null, name: null, list: [] });
      		}
      		let evaltaskdetail=response.data;
      		data.length=0;
      		evaltaskdetail.data.map((item,i)=>{
              data.push({
              	key:i,
              	table_name:item.table_name,
              	item_title:item.item_title,
              	item_content:item.item_content,
              	item_point:item.item_point
              })
            })
		})
		.then(()=>{
			for(var i=0;i<evalList.length;i++){
				if(evalList[i].id){
					PageConf.push(evalList[i].list.length.toString());
				}
			}
		})
		.then(()=>{
			this.setState({
				evalList:evalList
			})
			console.log(evalList)
		})
	}

	onSubmit=(e)=>{
		e.preventDefault();
   		this.props.form.validateFields((err,values)=>{
   			if(!err){
   				if(values.groupSize<1){
   					message.error("小组成员人数至少为1");
   				}else if(values.self<0 || values.self>=1 || values.teacher<0 || values.teacher>=1 || values.students<0|| values.students>=1){
   					message.error("比重不能小于0或大于等于1")
   				}else if(values.self*1+values.teacher*1+values.students*1!=1){
   					message.error("比重相加必须等于1");
   				}else{
   					axios.post(`${config.basicURL_T}/updateConf`,{conf:values})
   						.then((response)=>{
   						message.success('修改成功');
   					})
   				}
   			}
   		})
	}

	render(){
		const { getFieldDecorator } = this.props.form;
		return(
      <div className='g-main'>
			<div className='m-tabs'>
				<Tabs>
				<TabPane key={1} tab='修改评分配置'>
				<Form>
				<p>小组成员数:</p>
				 <FormItem>
          			{getFieldDecorator('groupSize',{initialValue:this.state.size})(
            		<Input />
          			)}
        		</FormItem>
        		<p>自评配比:</p>
				 <FormItem>
          			{getFieldDecorator('self',{initialValue:this.state.self})(
            		<Input />
          			)}
        		</FormItem>
        		<p>教师配比:</p>
				 <FormItem>
          			{getFieldDecorator('teacher',{initialValue:this.state.teacher})(
            		<Input />
          			)}
        		</FormItem>
        		<p>互评配比:</p>
				 <FormItem>
          			{getFieldDecorator('students',{initialValue:this.state.students})(
            		<Input />
          			)}
        		</FormItem>
        		<Button type='primary' className='u-change-conf-Btn' htmlType='submit' onClick={this.onSubmit}>提交更改</Button>
				</Form>
				</TabPane>
				<TabPane key={2} tab='修改评分标准'>
				<EditableTable/>
				</TabPane>
				</Tabs>
			</div>
      </div>
			)
	}
}

export default Form.create()(ChangeConf);