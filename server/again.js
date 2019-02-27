const express    = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');
const multer	 = require('multer');
const fs 		 = require('fs');
const pathLib	 = require('path');
var cookiePaerser   = require('cookie-parser');
var session      = require('express-session');
const RedisStore = require('connect-redis')(session);

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123',
  database : 'Again'
});
var cores=require('cors');

const app = express();
app.use(cores());
app.use(cookiePaerser('sessiontest'));
app.use(session({
  store: new RedisStore(),
  cookie: { maxAge: 1 * 60 * 60 * 1000 }, //默认1小时
  secret: 'sessiontest',
  resave: false,
  saveUninitialized: false
}));

app.post('/student/login',bodyParser.json(),function(req,res){
	const {user,pwd} = req.body;
	connection.query(`select * from student where id='${user}';`,function(err,results){
		if(err)throw err;
		else{
			if(results.length!=0){
				res.cookie('user',user);
				return res.json({
					data:1,
					name:results[0].name,
					class:results[0].class
				})
			}else{
				return res.json({
					data:-1
				})
			}
		}
	})
})

app.post('/teacher/login', bodyParser.json(),function (req, res) {
    const user=req.body.user;
    connection.query(`select * from teacher where id='${user}';`, function (error, results) {
      if (error) throw error;
      else{
      	return res.json({
      		data:results
      	})
      }
    });
});

app.post('/teacher/newTask', bodyParser.json(),function(req,res){
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
		connection.query(`select name from student where class='${i}';`,(err,results)=>{
			if(err)throw err;
			else{
				for(let j=0;j<size;j++){
					for(item of results){
						stu.push(item['name']);
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
})

app.post('/getConf',(req,res)=>{
	connection.query(`select * from conf`,(err,results)=>{
		res.send({size:results[0].val,
			r1:results[1].val,
			r2:results[2].val,
			r3:results[3].val});
	})
})

app.get('/teacher/myTask',function(req,res){
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
})

app.post('/getAllTask',bodyParser.json(),function(req,res){
	const {name,className}=req.body;
	connection.query(`select distinct * from task where class='${className}';`,(err,results)=>{
		res.send(results);
	})
})

app.post('/checkEvalComplete',bodyParser.json(),(req,res)=>{
	const {name,title,size,r1,r2,r3,className}=req.body;
	connection.query(`select * from evalDetail where submit='${name}' and title='${title}' and sum!=0;`,(err,results)=>{
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
})

app.post('/updateTaskStatus',bodyParser.json(),(req,res)=>{
	const {name,title,p1,p2,p3}=req.body;
	connection.query(`update submit set self=${p3},tea=${p2},student=${p1},eval_result=${p1+p2+p3} where name='${name}' and title='${title}'`);
	res.end();
})

app.post('/checkStatus',bodyParser.json(),(req,res)=>{
	const {name,title,className}=req.body;
	connection.query(`select * from submit where name='${name}' and title='${title}'`,(err,results)=>{
		if(err)throw err;
		else{
			if(results.length==0){
				connection.query(`insert into submit value('${name}','${title}','${className}','','','',null,null,null,0,0);`)
				res.send([{name:`'${name}'`,title:`'${title}'`,class:`${className}`,doc_url:'',ppt_url:'',video_url:'',self:null,teacher:null,student:null,submit:0,eval_result:0}]);
			}else{
				res.send(results);
			}
		}
	})
})

//application/vnd.ms-powerpoint
//video/mp4
//application/vnd.openxmlformats-officedocument.wordprocessingml.document

const objMulter=multer({dest:'../../public/upload'});
app.use(objMulter.any());
app.post('/upload', function(req,res){
	var files=req.files;
	for(file of files){
		var filename=file.originalname;
		var newname='';
		var type=file.mimetype;
		if(type==='application/vnd.ms-powerpoint'){
			newname=`../../public/upload/ppt/`+filename;
		}else if(type==='video/mp4'){
			newname='../../public/upload/video/'+filename;
		}else if(type==='application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
			type==='application/msword'){
			newname='../../public/upload/word/'+filename;
		}else{
			console.log('???');
		}

		fs.rename(file.path,newname,(err)=>{
			if(err){
				res.send(err);
			}else{
				return res.json({
					success:true
				})
			}
		})
	}

})

const stu=['Nash','Tony','a','b','c','d','e','f','g','h',
'Nash','Tony','a','b','c','d','e','f','g','h',
'Nash','Tony','a','b','c','d','e','f','g','h'];

// Nash,Tony,a,b,c,d,e,f,g,h
// i,h,k,l,m,n,o,p,q,r
app.post('/evalDetail',bodyParser.json(),(req,res)=>{
	const {name,title,submit,type}=req.body;
	connection.query(`select * from evalDetail where name='${name}' and title='${title}' and submit='${submit}';`,(err,results)=>{
		if(err)throw err;
		else{
			if(results.length==0){
				connection.query(`insert into evalDetail value('${name}','${submit}','${title}','0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0',0,${type});`)
				res.send([{name:`${name}`,submit:`${submit}`,title:`${title}`,results:'0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0',sum:0,type:`${type}`}]);
			}else{
				res.send(results);
			}
		}
	})
})

app.post('/submitDetail',bodyParser.json(),(req,res)=>{
	const {title,submit}=req.body;
	connection.query(`select * from submit where name='${submit}' and title='${title}';`,(err,results)=>{
		if(err)throw err;
		else{
			res.send(results);
		}
	})
})

app.post('/upload-finish',bodyParser.json(),(req,res)=>{
	const {fileList,name,title}=req.body;
	for(file of fileList){
		let type=file.split('.')[1];
		if(type==='doc' || type==='docx'){
			connection.query(`update submit set doc_url='${file}' where name='${name}' and title='${title}';`);
		}else if(type==='ppt' || type==='pptx'){
			connection.query(`update submit set ppt_url='${file}' where name='${name}' and title='${title}';`);
		}else if(type==='mp4'){
			connection.query(`update submit set video_url='${file}' where name='${name}' and title='${title}';`);
		}
	}
	connection.query(`update submit set submit=1 where name='${name}' and title='${title}';`);
	res.end();
})

app.post('/addStudent',bodyParser.json(),(req,res)=>{
	const {className,students,name}=req.body;
	for(item of students){
		connection.query(`insert into student value('${item.id}','${item.pwd}','${item.name}','${className}')`)
	}
	connection.query(`select class from teacher where name='${name}';`,(err,results)=>{
		if(err)throw err;
		else{
			let class_pre=results[0].class;
			class_pre+=`,${className}`;
			connection.query(`update teacher set class='${class_pre}';`);
		}
	})
	res.end();
})

app.post('/myClass',bodyParser.json(),(req,res)=>{
	const {name}=req.body;
	connection.query(`select * from teacher where name='${name}';`,(err,results)=>{
		if(err)throw err;
		else{
			if(results.length>0){
				res.send(results[0]['class']);
			}
		}
	})
})

app.post('/getStudent',bodyParser.json(),(req,res)=>{
	const {className}=req.body;
	connection.query(`select * from student where class='${className}';`,(err,results)=>{
		if(err)throw err;
		else{
			res.send(results);
		}
	})
})

app.post('/distribute',bodyParser.json(),(req,res)=>{
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
})

app.post('/eval',bodyParser.json(),(req,res)=>{
	const {name}=req.body;
	connection.query(`select * from eval_group where eval='${name}';`,(err,results)=>{
		if(err)throw err;
		else{
			res.send(results);
		}
	})
})

app.post('/getEvalForm',bodyParser.json(),(req,res)=>{
	connection.query('select * from evalForm order by tid,item_order;',(err,results)=>{
		if(err)throw err;
		else{
			return res.json({
				data:results
			})
		}
	})
})

app.post('/getInitData',bodyParser.json(),(req,res)=>{
	const {name,title,submit}=req.body;
	connection.query(`select * from evalDetail where name='${name}' and title='${title}' and submit='${submit}';`,(err,results)=>{
		if(err)throw err;
		else{
			res.send(results);
		}
	})
})

app.post('/doEval',bodyParser.json(),(req,res)=>{
	const {info,result}=req.body;
	connection.query(`select * from evalDetail where name='${info.name}' and submit='${info.submit}' and title='${info.title}';`,(err,results)=>{
		if(results.length===0){
			connection.query(`insert into evalDetail value('${info.name}','${info.submit}','${info.title}','${result}',${info.sum});`)
		}else{
			connection.query(`update evalDetail set results='${result}',sum=${info.sum} where name='${info.name}' and submit='${info.submit}' and title='${info.title}';`)
		}
	})
	return res.json({
		success:1
	})
})

app.post('/getFeedBack',bodyParser.json(),(req,res)=>{
	const {title}=req.body;
	connection.query(`select name,title from submit where title='${title}' and submit=1 group by class,name,title;`,(err,results)=>{
		if(err)throw err;
		else{
			res.send(results);
		}
	})
})

app.post('/checkCharts',bodyParser.json(),(req,res)=>{
	const {title,className,teacher}=req.body;
	connection.query(`select * from submit where title='${title}' and class='${className}' and eval_result>0;`,(err,results)=>{
		if(err)throw err;
		else{
			res.send(results);
		}
	})
})

app.post('/updateTask',bodyParser.json(),(req,res)=>{
	const {title,className,teacher,info}=req.body;
	connection.query(`update task set title='${info.title}',detail='${info.detail}',teacher='${teacher}',class='${info.className}',date_s= '${info.time[0].split('T')[0]}',date_e='${info.time[1].split('T')[0]}'
		where title='${title}' and class='${className}' and teacher='${teacher}'`,(err,results)=>{
			if(err)throw err;
			else{
				res.end();
			}
		})
})

app.post('/getVeryDetail',bodyParser.json(),(req,res)=>{
	const {name,title}=req.body;
	connection.query(`select m.type,n.sum,m.submit,m.eval from eval_group as m,evaldetail as n where m.submit=n.submit and m.eval=n.name and m.title=n.title and m.submit='${name}' and m.title='${title}' and n.sum>0`,(err,results)=>{
		if(err)throw err;
		else{
			res.send(results);
		}
	})
})

app.post('/updateConf',bodyParser.json(),(req,res)=>{
	const {conf}=req.body;
	connection.query(`update conf set val=${conf.groupSize*1} where id=1`);
	connection.query(`update conf set val=${conf.self*1} where id=2`);
	connection.query(`update conf set val=${conf.teacher*1} where id=3`);
	connection.query(`update conf set val=${conf.students*1} where id=4`);
	res.end();
})
// 教学设计 目标设计 教学目标清楚、具体，易于理解，便于实施，行为动词使用正确，阐述规范；符合课标要求、学科特点和学生实际；体现对知识、能力与创新思维等方面的要求
app.post('/updateEvalForm',bodyParser.json(),(req,res)=>{
	const {item}=req.body;
	connection.query(`update evalform set table_name='${item.table_name}',item_title='${item.item_title}',item_content='${item.item_content}',item_point=${item.item_point} where id=${item.key+1}`);
	res.end();
})

app.post('/DeleteEvalForm',bodyParser.json(),(req,res)=>{
	const {key}=req.body;
	connection.query(`delete from evalform where id=${key+1}`);
})

app.listen(4000, () => {
 console.log('Go to http://localhost:4000');
});

