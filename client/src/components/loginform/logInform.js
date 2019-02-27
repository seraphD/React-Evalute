import React from 'react';
import Header from '../head/head';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'proptypes';
import {bindActionCreators} from 'redux';
import { LOGIN } from '../../reducers/index';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {

  componentWillReceiveProps(nextstate){
    if(nextstate.login){
      let history=this.context.router.history;
      if(nextstate.type==='s'){
        localStorage.setItem('user',nextstate.user);
        localStorage.setItem('className',nextstate.className);
        localStorage.setItem('type','s');
        localStorage.setItem('id',this.state.id);
        history.push('/student/taskDetail');
      }else{
        localStorage.setItem('user',nextstate.user);
        localStorage.setItem('type','t');
        localStorage.setItem('id',this.state.id);
        history.push('/teacher');
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({
          id:values.userName
        })
        this.props.fetchData(values.userName,values.password);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
      <Header/>
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
      </Form>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    user:state.name,
    login:state.login,
    type:state.type,
    className:state.className
  }
}

const mapDispatchToProps = (dispatch) => ({
    fetchData: bindActionCreators(LOGIN,dispatch),
});

NormalLoginForm.contextTypes={
  router:PropTypes.object.isRequired,
};

const WrappedNormalLoginForm = Form.create()(connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm));
export default WrappedNormalLoginForm;