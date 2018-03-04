var Mock = require("mockjs");
var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/studentSystem");

var schedule = require("../models/Schedule.js");
var Schedule = mongoose.model('schedule', schedule);

var arrs = Mock.mock({
    "schedule": [{
            "name" : "Monday",
            "mission": [{
                    "morning|1-4": [{
                        "course|1": ["语文", "数学", "英语", "体育", "美术", "物理"],
                        "adress|1" : ["尔雅", "静远", "耘慧"]
                    }]
                },
                {
                    "afternoon|1-4": [{
                        "course|1": ["语文", "数学", "英语", "体育", "美术", "物理"],
                        "adress|1" : ["尔雅", "静远", "耘慧"]
                    }]
                }
            ]
        },
        {   
            "name" : "Tuesday",
            "mission": [{
                    "morning|1-4": [{
                        "course|1": ["语文", "数学", "英语", "体育", "美术", "物理"],
                        "adress|1" : ["尔雅", "静远", "耘慧"]
                    }]
                },
                {
                    "afternoon|1-4": [{
                        "course|1": ["语文", "数学", "英语", "体育", "美术", "物理"],
                        "adress|1" : ["尔雅", "静远", "耘慧"]
                    }]
                }
            ]
        },
        {   
            "name" : "Wednesday",
            "mission": [{
                    "morning|1-4": [{
                        "course|1": ["语文", "数学", "英语", "体育", "美术", "物理"],
                        "adress|1" : ["尔雅", "静远", "耘慧"]
                    }]
                },
                {
                    "afternoon|1-4": [{
                        "course|1": ["语文", "数学", "英语", "体育", "美术", "物理"],
                        "adress|1" : ["尔雅", "静远", "耘慧"]
                    }]
                }
            ]
        },
        {   
            "name" : "Thursday",
            "mission": [{
                    "morning|1-4": [{
                        "course|1": ["语文", "数学", "英语", "体育", "美术", "物理"],
                        "adress|1" : ["尔雅", "静远", "耘慧"]
                    }]
                },
                {
                    "afternoon|1-4": [{
                        "course|1": ["语文", "数学", "英语", "体育", "美术", "物理"],
                        "adress|1" : ["尔雅", "静远", "耘慧"]
                    }]
                }
            ]
        },
        {   
            "name" : "Friday",
            "mission": [{
                    "morning|1-4": [{
                        "course|1": ["语文", "数学", "英语", "体育", "美术", "物理"],
                        "adress|1" : ["尔雅", "静远", "耘慧"]
                    }]
                },
                {
                    "afternoon|1-4": [{
                        "course|1": ["语文", "数学", "英语", "体育", "美术", "物理"],
                        "adress|1" : ["尔雅", "静远", "耘慧"]
                    }]
                }
            ]
        },
        {
            "name" : "Saturday",
            "mission": [{
                    "morning|1-4": [{
                        "course|1": ["语文", "数学", "英语", "体育", "美术", "物理"],
                        "adress|1" : ["尔雅", "静远", "耘慧"]
                    }]
                },
                {
                    "afternoon|1-4": [{
                        "course|1": ["语文", "数学", "英语", "体育", "美术", "物理"],
                        "adress|1" : ["尔雅", "静远", "耘慧"]
                    }]
                }
            ]
        },
        {
            "name" : "Sunday",
            "mission": [{
                    "morning|1-4": [{
                        "course|1": ["语文", "数学", "英语", "体育", "美术", "物理"],
                        "adress|1" : ["尔雅", "静远", "耘慧"]
                    }]
                },
                {
                    "afternoon|1-4": [{
                        "course|1": ["语文", "数学", "英语", "体育", "美术", "物理"],
                        "adress|1" : ["尔雅", "静远", "耘慧"]
                    }]
                }
            ]
        },
    ]
})
console.log(JSON.stringify(arrs));

// //把数组插入到数据库中
// //先删除所有数据
Schedule.remove({}).exec(function (err, results) {
    console.log(`已经删除了${results}条数据`);

    Schedule.create(arrs.schedule, function (err, docs) {
        console.log(docs);

        console.log(`已经插入了${docs.length}条数据`);
    });
});