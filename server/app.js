const express    = require('express');
const bodyParser = require('body-parser');
const db 		 = require('./db/mysql');
const cores		 = require('cors');

const app = express();
app.use(cores());

app.use('/teacher',require('./routes/teacher'));
app.use('/student',require('./routes/students'));

app.post('/getConf',(req,res)=>{
	db.getConf(req,res);
})

app.post('/getEvalForm',bodyParser.json(),(req,res)=>{
	db.getEvalForm(req,res);
})

app.post('/getInitData',bodyParser.json(),(req,res)=>{
	db.getInitData(req,res);
})

app.post('/doEval',bodyParser.json(),(req,res)=>{
	db.doEval(req,res);
})

app.post('/getStudentName',bodyParser.json(),(req,res)=>{
	db.getStudentName(req,res);
})

app.listen(4000, () => {
 console.log('Go to http://localhost:4000');
});
