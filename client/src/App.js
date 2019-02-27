import React from 'react';
import NormalLoginForm from './components/loginform/logInform';
import {HashRouter as Router,Route,Switch,withRouter} from 'react-router-dom';
import TeacherPage from './InnerPages/teacherPage';
import StudentPage from './InnerPages/studentPage';
import require_auth from './components/require/require_auth';

const Page= withRouter((props)=>{
	return(
		<Switch>
			<Route path='/teacher' component={require_auth(TeacherPage)}/>
			<Route path='/student' component={require_auth(StudentPage)}/>
			<Route path='/' component={NormalLoginForm}/>
		</Switch>
		);
})

class App extends React.Component{
	render(){
		return(
			<Router>
			<Page/>
			</Router>
			);
	}
}

export default App;
