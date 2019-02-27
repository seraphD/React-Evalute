var express = require('express');
const bodyParser = require('body-parser');
const multer	 = require('multer');
const fs 		 = require('fs');
const pathLib	 = require('path');
const objMulter  = multer({dest:'../../public/upload'});
var router = express.Router();
var db = require('../db/mysql');
router.use(objMulter.any());

router.post('/login',bodyParser.json(),(req,res)=>{
	db.getLoginS(req,res);
})

router.post('/getAllTask',bodyParser.json(),(req,res)=>{
	db.getAllTask(req,res);
})

router.post('/checkEvalComplete',bodyParser.json(),(req,res)=>{
	db.checkEvalComplete(req,res);
})

router.post('/updateTaskStatus',bodyParser.json(),(req,res)=>{
	db.updateTaskStatus(req,res);
})

router.post('/checkStatus',bodyParser.json(),(req,res)=>{
	db.checkStatus(req,res);
})

router.post('/upload',(req,res)=>{
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

router.post('/upload-finish',bodyParser.json(),(req,res)=>{
	db.uploadfinish(req,res);
})

router.post('/distribute',bodyParser.json(),(req,res)=>{
	db.distribute(req,res);
})

router.post('/eval',bodyParser.json(),(req,res)=>{
	db.eval(req,res);
})

router.post('/evalDetail',bodyParser.json(),(req,res)=>{
	db.evalDetail(req,res);
})

router.post('/submitDetail',bodyParser.json(),(req,res)=>{
	db.submitDetail(req,res);
})

module.exports=router;