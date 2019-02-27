export const USER_LOGIN ='USER_LOGIN';
export const FETCH_DATA ='FETCHD_ATA';
export const FETCH_DATA_SUCCESS_S='FETCH_DATA_SUCCESS_S';
export const FETCH_DATA_SUCCESS_T='FETCH_DATA_SUCCESS_T';
export const LOGIN_FAILED='LOGIN_FAILED';
export const CREATE_NEW_TASK='CREATE_NEW_TASK';
export const MY_TASK='MY_TASK';
export const CHECKSESSION='CHECKSESSION';
export const EVAL_FORM_DETAIL='EVAL_FORM_DETAIL';
export const DO_EVAL_FINISH='DO_EVAL_FINISH';
export const CHECK_COMPLETE='CHECK_COMPLETE';
export const TASK_LIST='TASK_LIST';
export const RETURN_EVAL_TASK='RETURN_EVAL_TASK';
export const EVAL_NOW='EVAL_NOW';
export const INITIAL='INITIAL';
export const DISTRIBUTE_FIINISH='DISTRIBUTE_FIINISH';
export const REFRESH_COMPLETE='REFRESH_COMPLETE';
export const BACK='BACK';
export const Feed_Back='Feed_Back';
export const CHARTS_NOW='CHARTS_NOW';
export const MY_CLASS='MY_CLASS';
export const GET_STUDENT='GET_STUDENT';

export function LOGIN(users,pwd){
	return {type: USER_LOGIN, users,pwd};
}

export function NEWTASK(info){
	return {type:CREATE_NEW_TASK,info};
}

export function MYTASK(name){
	return {type:MY_TASK,name};
}
export function CHECK_SESSION(){
	return {type:CHECKSESSION}
}


const initialState={
	fetched:false,
	id:'',
	name:'',
	type:'',
	className:'',
	login:false,
	authenticated:false
}

const appReducer = (state=initialState, action)=>{
	switch(action.type){
		case FETCH_DATA_SUCCESS_S: {
			let r=action.response.data;
			return {...state, fetched:true ,id:r.id,type:'s',name:r.name,className:r.class,login:true,authenticated:true }
		}
		case FETCH_DATA_SUCCESS_T: {
			let r=action.response.data;
			return {...state, fetched:true,id:r.id,type:'t', name:r.name,login:true,authenticated:true}
		}
		case USER_LOGIN: {
			return {...state,fetched:true}
		}
		case LOGIN_FAILED: {
			return {...state,fetched:false}
		}
		case CREATE_NEW_TASK: {
			return {...state,info:action.info}
		}
		case MY_TASK: {
			return {...state,name:action.name}
		}
		case CHECKSESSION: {
			return {...state}
		}
		case EVAL_FORM_DETAIL:{
			let data=action.action.data;
			return {...state,title:data.task.title,submit:data.task.eval1}
		}
		case RETURN_EVAL_TASK:{
			let eval_task=action.return_eval_task;
			return {...state,eval_task_list:eval_task};
		}
		case DO_EVAL_FINISH:{
			return {...state}
		}
		case CHECK_COMPLETE:{
			return {...state,complete:action.response.data}
		}
		case TASK_LIST:{
			let taskList=action.task_return;
			return {...state,taskList:taskList}
		}
		case EVAL_NOW:{
			let data=action.data;
			return {...state,evalNow:data}
		}
		case INITIAL:{
			var results;
			if(action.r.data.length>0){
				results=action.r.data[0].results;
			}else{
				results=[];
			}
			return {...state,init:results};
		}
		case DISTRIBUTE_FIINISH:{
			return {...state,finish:1}
		}
		case REFRESH_COMPLETE:{
			let data=action.action.data;
			if(data.type==='s'){
				return{...state,fetched:1,name:data.name,className:data.className,type:data.type,id:data.id,authenticated:true}
			}else{
				return{...state,fetched:1,name:data.name,type:data.type,id:data.id,authenticated:true}
			}
		}
		case BACK:{
			return {...initialState}
		}
		case Feed_Back:{
			return {...state,feedBack:action.tasks};
		}
		case CHARTS_NOW:{
			let chartsData=action.response.data;
			return {...state,chartsData:chartsData};
		}
		case MY_CLASS:{
			let className=action.response.data.split(',');
			return {...state,className:className}
		}
		default: {
			return {...state}
		}
	}
}

export default appReducer;