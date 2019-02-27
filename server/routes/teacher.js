var express = require('express');
var router = express.Router();
var db = require('../db/mysql');
const bodyParser = require('body-parser');

router.post('/login',bodyParser.json(),(req,res)=>{
	db.getLoginT(req,res);
})

router.post('/myClass',bodyParser.json(),(req,res)=>{
	db.myClass(req,res);
})

router.get('/myTask',(req,res)=>{
	db.myTask(req,res);
})

router.post('/newTask',bodyParser.json(),(req,res)=>{
	db.newTask(req,res);
})

router.post('/checkCharts',bodyParser.json(),(req,res)=>{
	db.checkCharts(req,res);
})

router.post('/getVeryDetail',bodyParser.json(),(req,res)=>{
	db.getVeryDetail(req,res);
})

router.post('/getStudent',bodyParser.json(),(req,res)=>{
	db.getStudent(req,res);
})

router.post('/addStudent',bodyParser.json(),(req,res)=>{
	db.addStudent(req,res);
})

router.post('/updateEvalForm',bodyParser.json(),(req,res)=>{
	db.updateEvalForm(req,res);
})

router.post('/DeleteEvalForm',bodyParser.json(),(req,res)=>{
	db.DeleteEvalForm(req,res);
})

router.post('/updateConf',bodyParser.json(),(req,res)=>{
	db.updateConf(req,res);
})

router.post('/updateTask',bodyParser.json(),(req,res)=>{
	db.updateTask(req,res);
})

module.exports=router;
