import React from 'react';
import {Form, Button,Tabs, Row, Col, InputNumber} from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './evalForm.css';
import config from '../../config/config';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class EvalForm extends React.Component{
  constructor(props){
    super(props);
    this.state={
      evalList:[],
      operations:<div>
          <Button type="primary" className='u-do-eval' htmlType="button" icon="check" onClick={this.doSave} data-type="1">提交</Button>
          <Button type="primary" className='u-do-eval' htmlType="button" icon="save" onClick={this.doSave}  data-type="0" >保存</Button>
          <Button type="primary" className='u-do-eval' htmlType="button" icon="rollback" onClick={this.doReturn}>返回</Button>
          </div>,
    }
  }

  static contextTypes ={
    store:PropTypes.object,
    router:PropTypes.object.isRequired,
  }

  doReturn=(e)=>{
    const data=this.context.store.getState();
    if(data.type==='s'){
      this.context.router.history.push('/student/eval');
    }else{
      this.context.router.history.push('/teacher/eval');
    }
  }

  doSave=(e)=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        var data=[];
        for(let i=1;i<=4;i++){
          if(i===1){
            for(let j=0;j<12;j++){
              data.push(values[`${i}-${j}`]);
            }
          }else if(i===2){
            for(let j=0;j<5;j++){
              data.push(values[`${i}-${j}`]);
            }
          }else if(i===3){
            for(let j=0;j<5;j++){
              data.push(values[`${i}-${j}`]);
            }
          }else{
            for(let j=0;j<10;j++){
              data.push(values[`${i}-${j}`]);
            }
          }
        }
      }
      let ss=this.context.store.getState();
      let i=e.target.getAttribute('data-type');
      let sum=0;
      if(i===1){
        sum=eval(data.join('+'));
      }
      let info={name:ss.name,submit:ss.evalNow.submit,title:ss.evalNow.title,type:ss.type,sum:sum,id:ss.id};
      let results=data.join(',');
      this.props.doEval(info,results);
      if(ss.type==='s'){
        this.context.router.history.push('/student/eval');
      }else{
        this.context.router.history.push('/teacher/eval');
      }
    });
  }

  componentWillMount(){
    let evalList=[];
    let evaltaskdetail=[];
    let operations;
    let complete = 0;

    const data=this.context.store.getState();
    if(typeof(data.evalNow)==='undefined'){
      var evalNow_name=localStorage.getItem('evalNow_name');
      var evalNow_title=localStorage.getItem('evalNow_title');
      var evalNow_submit=localStorage.getItem('evalNow_submit');
    }

    axios.post(`${config.basicURL}/getEvalForm`)
    .then((response)=>{
      for(var i=0;i<4;i++) {
            evalList.push({ id: null, name: null, list: [] });
      }
      evaltaskdetail=response.data;
      if(typeof(evaltaskdetail) === "undefined"){
        
      }else{
            evaltaskdetail.data.map((item,i)=>{
              var obj = {};
              var id = parseInt(item.tid,0) - 1;
              evalList[id].id = item.tid;
              evalList[id].name = item.table_name;
              obj.title = item.item_title;
              obj.content = item.item_content;
              obj.point = item.item_point;
              obj.grade = item.grade;
              evalList[id].list.push(obj);
            }) 
          }
      if (complete === 0) {
          operations = <div>
          <Button type="primary" htmlType="button" icon="check" onClick={this.doSave} data-type="1">提交</Button>
          <Button type="primary" htmlType="button" icon="save" onClick={this.doSave}  data-type="0" >保存</Button>
          <Button type="primary" htmlType="button" icon="rollback" onClick={this.doReturn}>返回</Button>
          </div>;
      }else{
        operations = <div>
          <Button type="primary" htmlType="button" icon="rollback" onClick={this.doReturn}>返回</Button>
        </div>;
      }
      this.setState({
        evalList:evalList,
        oprations:operations
      })
    })
    let store=this.context.store.getState();
    if(typeof(store.evalNow)==='undefined'){
      this.props.getRecord(evalNow_title,evalNow_name,evalNow_submit,store.id);
    }else{
      this.props.getRecord(store.evalNow.title,store.evalNow.id,store.evalNow.submit,store.id);
    }
  }

	render(){
    const { getFieldDecorator } = this.props.form;
    let init;
    var cont=0;
    if(typeof(this.props.init)!=='undefined'){
      init=this.props.init.split(',');
    }
		return(
			<div className='g-main'>
				<Form layout="vertical">
      <div className='m-eval-form'>
			<Tabs tabBarExtraContent={this.state.operations}>
            { this.state.evalList.map((item,i)=>{
              return ( 
                <TabPane tab={item.name} key={i}>
                  { item.list.map((o, j)=>{
                      return (
                        <FormItem key={j} >
                        <Row className='m-eval-row' gutter={0} type="flex" justify="space-around" align="middle">
                          <Col className="gutter-row" span={3}>
                            <div className="gutter-box">{o.title}</div>
                          </Col>
                          <Col className="gutter-row" span={17}>
                            <div className="gutter-box">{o.content}</div>
                          </Col>
                          <Col className="gutter-row fn-center" span={2} >
                            <div className="gutter-box">{o.point}</div>
                          </Col>
                          <Col className="gutter-row fn-center" span={2}>
                            { getFieldDecorator(`${i+1}-${j}` , { initialValue: init?init[cont++]*1:0, rules:[{required:true, message:'请输入数据!'}] })( <InputNumber min={0} max={o.point} size="small" /> )}
                          </Col>
                        </Row>
                        </FormItem>
                      )
                    }) }
                </TabPane>
               )
            }) }
          </Tabs>
        </div>
				</Form>
			</div>
			)
	}
}

const mapStateToProps  = (state) => ({
  init:state.init
});

const mapDispatchToProps=(dispatch)=>{
  return {
    getRecord(title,name,submit){
      var data={title:title,name:name,submit:submit};
      dispatch({type:'GET_RECORD',data});
    },
    doEval(info,results){
      dispatch({type:'DO_EVAL',info:info,results:results})
    },
    initail(name,type,className){
      var data={name:name,type:type,className:className}
      dispatch({type:'REFRESH',data})
    }
  }
}

const WrappedEvalForm = Form.create()(connect(mapStateToProps, mapDispatchToProps)(EvalForm));

export default WrappedEvalForm;