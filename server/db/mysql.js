const mysql      = require('mysql');
const config 	 = require('../../config/config');

const connection = mysql.createConnection({
  user     : config.user,
  password : config.password,
  database : config.database
});

const initEvaldata='0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0';

exports.getLoginS = function(req,res){
	const {user,pwd} = req.body;
	var sql0=`select * from student where id='${user}';`
	connection.query(sql0,function(err,results){
		if(err)throw err;
		else{
			if(results.length!=0){
				res.cookie('user',user);
				return res.json({
					data:1,
					name:results[0].name,
					class:results[0].class,
					id:results[0].id
				})
			}else{
				return res.json({
					data:-1
				})
			}
		}
	})
}

exports.getLoginT = function(req,res){
	const {user,pwd} = req.body;
	var sql1=`select * from teacher where id='${user}';`
	connection.query(sql1,function(err,results){
		if(err)throw err;
		else{
			if(results.length!=0){
				return res.json({
					data:1,
					name:results[0].name,
					class:results[0].class,
					id:user
				})
			}else{
				return res.json({
					data:-1
				})
			}
		}
	})
}

exports.getAllTask=function(req,res){
	const {name,className}=req.body;
	var sql2=`select distinct * from task where class='${className}';`;
	connection.query(sql2,(err,results)=>{
		res.send(results);
	})
}

exports.getConf = function(req,res){
	var sql3=`select * from conf`;
	connection.query(sql3,(err,results)=>{
		res.send({size:results[0].val,
			r1:results[1].val,
			r2:results[2].val,
			r3:results[3].val});
	})
}

exports.checkEvalComplete = function(req,res){
	const {name,title,size,r1,r2,r3,className}=req.body;
	var sql4=`select * from evalDetail where submit='${name}' and title='${title}' and sum!=0;`;
	connection.query(sql4,(err,results)=>{
		if(err)throw err;
		else{
			if(results.length==size*1+2){
				let p1=0;
				let p2=0;
				let p3=0;
				for(var i=0;i<results.length;i++){
					let evalR=results[i];
					if(evalR.type==2){
						p1=evalR.sum*r1;
					}else if(evalR.type==0){
						p3=evalR.sum*r3;
					}else{
						p2+=evalR.sum;
					}

					if(i==results.length-1){
						p2=p2*r2/(size*1);
						res.send({data:1,p1:p1,p2:p2,p3:p3});
					}
				}
			}else{
				res.send({data:0});
			}
		}
	})
}

exports.updateTaskStatus = function(req,res){
	const {name,title,p1,p2,p3,id}=req.body;
	var sql5=`update submit set self=${p3},tea=${p2},student=${p1},eval_result=${p1+p2+p3} where id='${id}' and title='${title}'`;
	connection.query(sql5);
	res.end();
}

exports.checkStatus = function (req,res) {
	const {name,title,className,id}=req.body;
	connection.query(`select * from submit where id='${id}' and title='${title}'`,(err,results)=>{
		if(err)throw err;
		else{
			if(results.length==0){
				connection.query(`insert into submit value('${id}','${name}','${title}','${className}','','','',null,null,null,0,0);`)
				res.send([{id:`'${id}'`,name:`'${name}'`,title:`'${title}'`,class:`${className}`,doc_url:'',ppt_url:'',video_url:'',self:null,teacher:null,student:null,submit:0,eval_result:0}]);
			}else{
				res.send(results);
			}
		}
	})
}

exports.eval = function(req,res){
	const {name}=req.body;
	connection.query(`select * from eval_group where eval='${name}';`,(err,results)=>{
		if(err)throw err;
		else{
			res.send(results);
		}
	})
}

exports.evalDetail = function(req,res){
	const {name,title,submit,type}=req.body;
	connection.query(`select * from evalDetail where name='${name}' and title='${title}' and submit='${submit}';`,(err,results)=>{
		if(err)throw err;
		else{
			if(results.length==0){
				connection.query(`insert into evalDetail value('${name}','${submit}','${title}','${initEvaldata}',0,${type});`)
				res.send([{name:`${name}`,submit:`${submit}`,title:`${title}`,results:`${initEvaldata}`,sum:0,type:`${type}`}]);
			}else{
				res.send(results);
			}
		}
	})
}

exports.submitDetail = function(req,res){
	const {title,submit}=req.body;
	connection.query(`select * from submit where id='${submit}' and title='${title}';`,(err,results)=>{
		if(err)throw err;
		else{
			res.send(results);
		}
	})
}

exports.getInitData = function(req,res){
	const {name,title,submit}=req.body;
	connection.query(`select * from evalDetail where name='${name}' and title='${title}' and submit='${submit}';`,(err,results)=>{
		if(err)throw err;
		else{
			res.send(results);
		}
	})
}

exports.uploadfinish = function(req,res){
	const {id,fileList,name,title}=req.body;
	for(file of fileList){
		let type=file.split('.')[1];
		if(type==='doc' || type==='docx'){
			connection.query(`update submit set doc_url='${file}' where id='${id}' and title='${title}';`);
		}else if(type==='ppt' || type==='pptx'){
			connection.query(`update submit set ppt_url='${file}' where id='${id}' and title='${title}';`);
		}else if(type==='mp4'){
			connection.query(`update submit set video_url='${file}' where id='${id}' and title='${title}';`);
		}
	}
	connection.query(`update submit set submit=1 where id='${id}' and title='${title}';`);
	res.end();
}

exports.distribute = function(req,res){
	const {title,teacher,name,className,size}=req.body;
	connection.query(`select * from eval where title='${title}' and class='${className}'`,(err,results)=>{
		if(err)throw err;
		else{
			let eval_stu=results[0].stu.split(',');
			let uid=[];
			let pos=0;

			for(var i=0;i<size;i++){
				do{
					pos=Math.round(Math.random()*(eval_stu.length-1));
        			select=eval_stu[pos];
				}while(uid.indexOf(select)>-1 || select==name)
				eval_stu.splice(pos,1);

				uid.push(select);
			}

			connection.query(`update eval set stu='${eval_stu.join(',')}' where title='${title}' and class='${className}'`);
      		connection.query(`insert into eval_group value('${name}','${title}','${name}',0)`);
      		connection.query(`insert into eval_group value('${name}','${title}','${teacher}',2)`);
      		for(var i=0;i<uid.length;i++){
      			connection.query(`insert into eval_group value('${name}','${title}','${uid[i]}',1)`)
      			if(i==uid.length-1){
      				res.end();
      			}
      		}
		}
	})
}

exports.getEvalForm = function(req,res){
	connection.query('select * from evalForm order by tid,item_order;',(err,results)=>{
		if(err)throw err;
		else{
			return res.json({
				data:results
			})
		}
	})
}

exports.doEval = function(req,res){
	const {info,result}=req.body;
	connection.query(`select * from evalDetail where name='${info.id}' and submit='${info.submit}' and title='${info.title}';`,(err,results)=>{
		if(results.length===0){
			connection.query(`insert into evalDetail value('${info.id}','${info.submit}','${info.title}','${initEvaldata}','${result}',${info.sum});`)
		}else{
			connection.query(`update evalDetail set results='${result}',sum=${info.sum} where name='${info.id}' and submit='${info.submit}' and title='${info.title}';`)
		}
	})
	return res.json({
		success:1
	})
}

exports.myClass = function(req,res){
	const {name}=req.body;
	connection.query(`select * from teacher where name='${name}';`,(err,results)=>{
		if(err)throw err;
		else{
			if(results.length>0){
				res.send(results[0]['class']);
			}else{
				res.end();
			}
		}
	})
}

exports.myTask = function(req,res){
	let name=req.query.teacher;
	let sql=`select * from task where teacher='${name}';`;
	connection.query(sql,function(err,results){
		if(err)throw err;
		else{
			return res.json({
				task:results
			})
		}
	})
}

exports.checkCharts = function(req,res){
	const {title,className,teacher}=req.body;
	connection.query(`select n.name,m.eval_result,m.self,m.student,m.tea,m.title,m.id from submit as m,student as n where m.title='${title}' and m.class='${className}' and m.eval_result>0 and m.id=n.id;`,(err,results)=>{
		if(err)throw err;
		else{
			res.send(results);
		}
	})
}

exports.getVeryDetail = function(req,res){
	const {name,title,id}=req.body;
	connection.query(`select m.type,n.sum,m.submit,m.eval,s.name from eval_group as m,evaldetail as n,student as s where m.submit=n.submit and m.eval=n.name and m.title=n.title and s.id='${id}' and m.submit='${id}' and m.title='${title}' and n.sum>0`,(err,results)=>{
		if(err)throw err;
		else{
			res.send(results);
		}
	})
}

exports.getStudent = function(req,res){
	const {className}=req.body;
	connection.query(`select * from student where class='${className}';`,(err,results)=>{
		if(err)throw err;
		else{
			res.send(results);
		}
	})
}

exports.addStudent = function(req,res){
	const {className,students,name}=req.body;
	for(item of students){
		connection.query(`insert into student value('${item.id}','${item.pwd}','${item.name}','${className}')`)
	}
	connection.query(`select * from teacher where id='${name}';`,(err,results)=>{
		if(err)throw err;
		else{
			let class_pre=results[0].class;
			class_pre+=`,${className}`;
			connection.query(`update teacher set class='${class_pre}';`);
		}
	})
	res.end();
}

exports.updateEvalForm = function(req,res){
	const {item}=req.body;
	connection.query(`update evalform set table_name='${item.table_name}',item_title='${item.item_title}',item_content='${item.item_content}',item_point=${item.item_point} where id=${item.key+1}`);
	res.end();
}

exports.DeleteEvalForm = function(req,res){
	const {key}=req.body;
	connection.query(`delete from evalform where id=${key+1}`);
}

exports.updateConf = function(req,res){
	const {conf}=req.body;
	connection.query(`update conf set val=${conf.groupSize*1} where id=1`);
	connection.query(`update conf set val=${conf.self*1} where id=2`);
	connection.query(`update conf set val=${conf.teacher*1} where id=3`);
	connection.query(`update conf set val=${conf.students*1} where id=4`);
	res.end();
}

exports.updateTask = function(req,res){
	const {title,className,teacher,info}=req.body;
	connection.query(`update task set title='${info.title}',detail='${info.detail}',teacher='${teacher}',class='${info.className}',date_s= '${info.time[0].split('T')[0]}',date_e='${info.time[1].split('T')[0]}'
		where title='${title}' and class='${className}' and teacher='${teacher}'`,(err,results)=>{
			if(err)throw err;
			else{
				res.end();
			}
	})
}

exports.getStudentName = function(req,res){
	const {id}=req.body;
	connection.query(`select name from student where id='${id}';`,(err,results)=>{
		if(err)throw err;
		else{
			res.send(results[0]);
		}
	})
}

exports.newTask = function(req,res){
	const {title,detail,className,date_s,date_e,name}=req.body;
	var size=0;
	connection.query(`select * from conf where id=1;`,(err,results)=>{
		if(err)throw err;
		else{
			size=results[0]['val'];
		}
	})
	for(i of className){
		var stu=[];
		let sql=`insert into task value('${title}','${detail}','${name}','${i}','${date_s}','${date_e}')`;
		connection.query(sql);
		connection.query(`select id from student where class='${i}';`,(err,results)=>{
			if(err)throw err;
			else{
				for(let j=0;j<size;j++){
					for(item of results){
						stu.push(item['id']);
					}
					if(stu.length===results.length*size){
						connection.query(`insert into eval value('${title}','${i}','${stu.join(',')}');`,(err,results)=>{
							if(err)throw err;
						})
					}
				}
			}
		})

	}
}
