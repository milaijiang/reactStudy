var express = require("express");
var mongoose = require("mongoose");
var formidable = require("formidable");
var fs = require("fs");
var url = require("url");
var path = require("path");
var gm = require('gm');

var app = express();
app.use(express.static("www"));
mongoose.connect("127.0.0.1/studentSystem");

var schema = require("./models/Schema.js");
var User = require("./models/User.js");
var schedule = require("./models/Schedule.js");
var Schedule = mongoose.model("Schedule", schedule);


// 2014学年成绩（通过id查询）接口
app.get("/Messages/:year/:xueqi/:id",function(req,res){
    var id = req.params.id;
    var year = req.params.year;
    var xueqi = req.params.xueqi;
    
    var Messages = mongoose.model(`Messages_${year}_${xueqi}`, schema);
    Messages.find({id}).exec(function(err,docs){
        res.json({
            results: docs
        })
    })
})

// 拉取默认数据
app.get("/Messages/:year/:xueqi",function(req,res){
    var year = req.params.year;
    var xueqi = req.params.xueqi;
    
    var Messages = mongoose.model(`Messages_${year}_${xueqi}`, schema);
    
    Messages.find().exec(function(err,docs){
        res.json({
            results : docs
        })
    })
})

// 修改个人成绩或信息
app.patch("/Messages/:year/:xueqi",function(req, res) {
    var year = req.params.year;
    var xueqi = req.params.xueqi;
    var form = new formidable.IncomingForm();
    var Messages = mongoose.model(`Messages_${year}_${xueqi}`, schema);
    
    form.parse(req, function (err, field, files) {
        target = field.target;
        id = field.id;
        Messages.update({"id" : id},target).exec(function(err, docs){
            if(!err) {
                res.json({
                    results : 1
                })
            }
        })
    })
})

// 删除个人成绩或信息
app.delete("/Messages/:year/:xueqi/:id", function (req, res) {
    var year = req.params.year;
    var xueqi = req.params.xueqi;
    var id = req.params.id;
    var form = new formidable.IncomingForm();
    var Messages = mongoose.model(`Messages_${year}_${xueqi}`, schema);
    
    form.parse(req, function(err, field) {
        Messages.remove({"id" : id}).exec(function(err, docs) {
            if(!err) {
                res.json({
                    results : 1
                })
            }            
        })
    })
})

// 增加
app.post("/Messages/:year/:xueqi", function(req, res) {
    var year = req.params.year;
    var xueqi = req.params.xueqi;
    var form = new formidable.IncomingForm();
    var Messages = mongoose.model(`Messages_${year}_${xueqi}`, schema);
    
    form.parse(req, function(err, field) {
        target = field.target;
        console.log(target);
        
        Messages.create(target, function(err, docs) {
            if(!err) {
                res.json({results : 1})                
            }
        })
    })
})
// 裁切图片接口
app.post("/up_portrait", function(req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.resolve(__dirname, "./www/upload");
    form.keepExtensions = true;
    form.parse(req, function(err, field, files) {
        res.send("<script>window.parent.finish('"+path.parse(files.pic.path).base+"')</script>")
    })
})

// 选择图片接口
app.post("/cut", function(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, {picurl,fangX,fangY,fangW,picw,pich}){

        var pic_url = path.resolve(__dirname, "./www/upload/", picurl);
        var pic_url_new = path.resolve(__dirname, "./www/portrait/", picurl);
        
        gm(pic_url).size(function(err, size) {
            var realW = size.width;
            var realH = size.height;

            gm(pic_url)
            .crop(parseInt(fangW * realW / picw), parseInt(fangW * realH / pich) , fangX * realW / picw, fangY * realH / pich)
            .resize(200, 200, "!")
            .write(pic_url_new, function(err) {
                if(!err) {
                    
                    User.update({"id" : 100001}, {"url" : picurl}).exec(function(){
                        console.log("更新成功")
                        res.send("1")
                        
                    })
                }
            })
        })
    })
})

// 拉取用户信息
app.get("/user/:id",function(req, res){
    var id = req.params.id;
    User.find({"id" : id}).exec(function(err, docs){
        res.json({
            results : docs[0]
        })
    })
})

app.patch("/user/:id", function(req, res) {
    var id = req.params.id;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, field, files) {
        password = field.password;
        User.update({"id" : id},{"password" : password}).exec(function(err, docs){
            if(!err) {
                console.log(1);
                
                res.json({
                    results : 1
                })
            }
        })
    })
})

// 辅助工具：观察用户数据
app.get("/user",function(req,res){
    User.find({}).exec(function(err,docs){
        res.json({
            results : docs
        })
    })
})

// 注册和登录
app.post("/user", function (req, res) { 
    var form = new formidable.IncomingForm();
	form.parse(req , function(err , fields , files){
		var id = fields.id;
        var password = fields.password;
        console.log(fields);
        
        if(fields.username != undefined) {
            
            User.find({"id" : id}, function (err, results) { 
                
                if(results.length > 0) {
                    res.json({
                        result : -2 
                    })
                } else {
                    User.create(fields, function (err, docs) { 
                        if(!err) {
                            console.log("success");
                            res.json({
                                "result" : 1
                            })
                        }
                     })
                }
             })
            
        } else {
            //和数据库比对
		User.find({"id" : id , "password" : password} , function(err , results){
			if(results.length > 0){
				//登录成功，下发session
				// req.session.login = true;
				// req.session.email = email;

				res.json({"result" : 1});
			}else{
				res.json({"result" : -1});
			}
		});
        }
        
        
		//加密
		// password = crypto.createHash('SHA256').update(password + "我是考拉").digest("hex");
		
		
	});
 })

// 得到课表数据
app.get("/schedule", function(req, res) {
    Schedule.find({}).exec(function(err, docs) {
        res.json({
            schedule : docs
        })
    })
})


app.listen(3000)
