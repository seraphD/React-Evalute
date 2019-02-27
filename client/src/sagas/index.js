import { takeLatest } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';
import { FETCH_DATA_SUCCESS_T, FETCH_DATA_SUCCESS_S,LOGIN_FAILED } from '../reducers/index';
import axios from 'axios';
import config from '../config/config';
function* getUserInfo(action){
	let response=null;
	try{
		if(action.users[0]==='s'){
			response=yield call(axios.post,`${config.basicURL_S}/login`,{user:action.users,pwd:action.pwd});
			if(response.data.data===1){
				yield put({type:FETCH_DATA_SUCCESS_S,response})
			}
			else{
				yield put({type:LOGIN_FAILED})
			}
		}else{
			response=yield call(axios.post,`${config.basicURL_T}/login`,{user:action.users,pwd:action.pwd});
			if(response.data.data===1){
				yield put({type:FETCH_DATA_SUCCESS_T,response})
			}else{
				yield put({type:LOGIN_FAILED})
			}
		}
	}catch(e){
		console.log(e);
	}
}

function* createNewTask(action){
	let response=null;
	let info=action.info;
	try{
		response=yield call(axios.post,`${config.basicURL_T}/newTask`,{
			title:info.title,
			detail:info.detail,
			className:info.className,
			date_s:info.time_s,
			date_e:info.time_e,
			name:info.name});
		let conf=yield call(axios.post,`${config.basicURL}/getConf`);
		yield call(axios.post,`${config.basicURL}/distribute`,{title:info.title,teacher:info.name,className:info.className,size:conf.size})
	}catch(e){
		console.log('err');
	}
}

function* startEval(action){
	let data=action.data;
	yield put({type:'EVAL_NOW',data});
}

function* get_eval_task(action){
	let response=yield call(axios.post,`${config.basicURL_S}/eval`,{name:action.data.name});
	let eval_task=response.data;
	let return_eval_task=[];
	for(var i=0;i<eval_task.length;i++){
		let task=eval_task[i];
		let r=yield call(axios.post,`${config.basicURL_S}/evalDetail`,{submit:task.submit,title:task.title,name:action.data.name,type:task.type});
		let t=r.data[0];
		let r2=yield call(axios.post,`${config.basicURL_S}/submitDetail`,{submit:task.submit,title:task.title})
		let t2=r2.data[0];
		if(t.sum===0){
			return_eval_task.push({title:t.title,doc_url:t2.doc_url,ppt_url:t2.ppt_url,video_url:t2.video_url,submit:t.submit,name:t2.name});
		}
	}
	yield put({type:'RETURN_EVAL_TASK',return_eval_task});
}

function* do_eval(action){
	yield call(axios.post,`${config.basicURL}/doEval`,{info:action.info,result:action.results})
	yield put({type:'DO_EVAL_FINISH',data:'1'});
}

function* getAlltask(action){
	try{
		let response=yield call(axios.post,`${config.basicURL_S}/getAllTask`,{name:action.data.name,className:action.data.class});
		let tasks=response.data;
		let task_return=[];
		let conf=yield call(axios.post,`${config.basicURL}/getConf`);
		for(let i=0;i<tasks.length;i++){
			let complete=yield call(axios.post,`${config.basicURL_S}/checkEvalComplete`,{name:action.data.id,title:tasks[i].title,size:conf.data.size,r1:conf.data.r1,r2:conf.data.r2,r3:conf.data.r3,className:action.data.class})
			if(complete.data.data){
				yield call(axios.post,`${config.basicURL_S}/updateTaskStatus`,{name:action.data.name,title:tasks[i].title,p1:complete.data.p1,p2:complete.data.p2,p3:complete.data.p3,className:action.data.class,id:action.data.id});
			}
			var detail=yield call(axios.post,`${config.basicURL_S}/checkStatus`,{name:action.data.name,title:tasks[i].title,className:action.data.class,id:action.data.id})
			var need=detail.data[0];
			task_return.push({title:tasks[i].title,detail:tasks[i].detail,submit:need.submit,eval_result:need.eval_result,teacher:tasks[i].teacher,date:tasks[i].date_e,detail:tasks[i].detail})
		}
		yield put({type:'TASK_LIST',task_return});
	}catch(e){
		console.log(e);
	}
}

function* getRecord(action){
	let name=action.data.name;
	let title=action.data.title;
	let submit=action.data.submit;
	let r=yield call(axios.post,`${config.basicURL}/getInitData`,{name:name,title:title,submit:submit});
	yield put({type:'INITIAL',r});
}

function* distribute(action){
	let title=action.data.title;
	let teacher=action.data.teacher;
	let name=action.data.name;
	let className=action.data.className;
	let conf=yield call(axios.post,`${config.basicURL}/getConf`);
	yield call(axios.post,`${config.basicURL_S}/distribute`,{title:title,teacher:teacher,name:name,className:className,size:conf.data.size});
	yield put({type:'DISTRIBUTE_FIINISH',action});
}

function* refresh(action){
	yield put({type:'REFRESH_COMPLETE',action})
}

function* logout(action){
	yield put({type:'BACK'})
}

function* getFeedBack(action){
	let name=action.data.name;
	let response=yield call(axios.get,`${config.basicURL_T}/myTask?teacher=${name}`);
	let tasks=response.data.task;
	yield put({type:'Feed_Back',tasks});
}

function* checkCharts(action){
	let task=action.data.task;
	let response=yield call(axios.post,`${config.basicURL_T}/checkCharts`,{title:task.title,className:task.class});
	yield put({type:'CHARTS_NOW',response});
}

function* myClass(action){
	let name=action.data.name;
	let response=yield call(axios.post,`${config.basicURL_T}/myClass`,{name:name});
	yield put({type:'MY_CLASS',response});
}

function* watcher(){
	yield takeLatest('USER_LOGIN',getUserInfo);
	yield takeLatest('CREATE_NEW_TASK',createNewTask);
	yield takeLatest('GET_EVAL_TASK',get_eval_task);
	yield takeLatest('DO_EVAL',do_eval);
	yield takeLatest('GET_ALL_TASK',getAlltask);
	yield takeLatest('START_EVAL',startEval);
	yield takeLatest('GET_RECORD',getRecord);
	yield takeLatest('DISTRIBUTE',distribute);
	yield takeLatest('REFRESH',refresh);
	yield takeLatest('LOGOUT',logout);
	yield takeLatest('GET_FEED_BACK',getFeedBack);
	yield takeLatest('CHECK_CHARTS',checkCharts);
	yield takeLatest('MYCLASS',myClass);
}

export default function* rootsaga(){
	yield watcher();
}