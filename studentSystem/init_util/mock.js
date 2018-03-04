var Mock = require("mockjs");
var mongoose = require("mongoose");

// //链接数据库，数据库会自动创建
mongoose.connect("mongodb://127.0.0.1/studentSystem");

var schema = require("../models/Schema.js");
var Messages_2017_Up = mongoose.model('Messages_2017_Up', schema);

// //来自mockjs.com的语法：
var arr = Mock.mock({
        "results|100": [
            {
                "id|+1" : 100001 ,
                "name": function(){
                        return Mock.mock('@cname');
                    },
                "sex|1" : ["男","女"],
                "class|1" : ["三年一班","三年二班","三年三班"],
                "math|0-100" : 50,
                "chinese|0-100" : 50,
                "english|0-100" : 50,
                "sport|0-100" : 50,
                "art|0-100" : 50
            }
        ]
});

// //把数组插入到数据库中
// //先删除所有数据
Messages_2017_Up.remove({}).exec(function(err,results){
    console.log(`已经删除了${results}条数据`);

    Messages_2017_Up.create(arr.results,function(err,docs){
        console.log(`已经插入了${docs.length}条数据`);
    });
});