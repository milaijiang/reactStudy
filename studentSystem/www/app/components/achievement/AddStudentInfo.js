import React, { Component } from 'react'
import { Modal , Input, Radio, notification,Alert } from "antd";
import { connect } from 'dva';

const RadioGroup = Radio.Group;

class AddStudentInfo extends Component {
    constructor(){
        super()
        this.state ={
            isShowOK : false,
            target : {
            },
        }
    }
    
    // 基本判断
    regJugeID(x, id) {
        var {target} = this.state;
        const {data} = this.props;
        
        // 输入框不能为空
        if (x != "") {
            // 判断学号
            if ( id == "id"){

                // 正则判断六位数字
                const reg = /^[1-9]\d{5}$/;
                
                const newX = Number(x); 
                console.log(newX);
                
                if(isNaN(newX)) {
                    $("#idTxt").html("学号应为数字")
                    return
                }
                // 用于判断是否与已有的学号冲突
                var jugeID = true;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id == newX) {
                        jugeID = false;
                    } 
                }
                
                // 判断正确与否
                if (reg.test(x) && jugeID) {
                    target.id = newX;
                    $("#idTxt").html("√");
                } 
                // 当学号数字不为六位时
                else if (x.length != 6){
                    this.id.input.value = "";
                    $("#idTxt").html("学号应为六位数字")
                }
                else if(jugeID == false) {
                    this.id.input.value = "";
                    $("#idTxt").html("学号已经存在")
                }
            }
            // 姓名
            if(id=="name") {
                target.name = x;
                $("#nameTxt").html("√");
            }
            // 性别
            if(id == "sex") {
                target.sex = x;                
            }
            // 年级
            if(id == "grade") {
                target.class = x;
                $("#gradeTxt").html("√");
            }
            if(id == "math" || id=="chinese" || id == "english" || id == "sport" || id == "art") {
                if(/^-?[1-9]\d*$/.test(x)) {
                    var nx = Number(x);
                    target[id] = nx;
                    $(`#${id}Txt`).html("√")
                } else {
                    $(`#${id}Txt`).html("请输入数字")
                }
            }
       } else {
            $(`#${id}Txt`).html("输入框不能为空")           
       }
    }

    addMessages(fun) {
        var arr=[];
        for(var i in this.state.target) {
            arr.push(this.state.target[i])
        }
        if(arr.length != 9) {
            console.log(arr.length);
            alert("输入信息失败，请重新正确的输入")
            return
        }
         // 添加成功的弹框
         const  openNotification = (type) => {
            notification[type]({
              message: '恭喜添加成功',
              description: 
              `你添加的学生信息为：
                学号：${this.state.target.id}
                姓名：${this.state.target.name}
                性别：${this.state.target.sex}
                班级：${this.state.target.class}
                数学：${this.state.target.math}
                语文：${this.state.target.chinese}
                英语：${this.state.target.english}
                体育：${this.state.target.sport}
                美术：${this.state.target.art}
              `,
              duration: 10,
            });
        };

        this.props.dispatch({"type":"student/add_async",target : this.state.target});
        this.props.showAdd(false) 
        openNotification("success")
    }
   

    render() {
       

        return (
            <Modal
                className="addstudentinfo"
                title="添加学生成绩"
                wrapClassName="vertical-center-modal"
                visible={this.props.isShowAdd}
                onOk={() => {
                    this.addMessages()
                }}
                onCancel={() => this.props.showAdd(false)}
            >
                <p>学号 
                    <Input 
                        width="20%" 
                        id="id" 
                        ref={node => this.id = node} 
                        onBlur={(e)=>{this.regJugeID(e.target.value, "id")}}
                    />
                    <span id="idTxt"></span>
                </p>
                <p>姓名 
                    <Input 
                        width="20%"  
                        ref={node => this.name = node} 
                        onBlur={(e)=>{this.regJugeID(e.target.value, "name")}}
                    />
                    <span id="nameTxt"></span>
                </p>
               
                <RadioGroup onChange={(e)=>{this.regJugeID(e.target.value, "sex")}}>
                    性别
                    <Radio value={"男"}>男</Radio>
                    <Radio value={"女"}>女</Radio>
                </RadioGroup>
                <p>班级 
                    <Input 
                        width="20%" 
                        ref={node => this.grade = node} 
                        onBlur={(e)=>{this.regJugeID(e.target.value, "grade")}}
                    />
                    <span id="gradeTxt"></span>
                </p>
                <p>数学 
                    <Input 
                        width="20%"
                        ref={node => this.math = node} 
                        onBlur={(e)=>{this.regJugeID(e.target.value, "math")}}
                    />
                    <span id="mathTxt"></span>
                </p>
                <p>语文 
                    <Input 
                        width="20%" 
                        onBlur={(e)=>{this.regJugeID(e.target.value, "chinese")}}
                    />
                    <span id="chineseTxt"></span>
                </p>
                <p>英语 
                    <Input 
                        width="20%" 
                        onBlur={(e)=>{this.regJugeID(e.target.value, "english")}}
                    />
                    <span id="englishTxt"></span>
                    </p>
                <p>体育 
                    <Input 
                        width="20%" 
                        onBlur={(e)=>{this.regJugeID(e.target.value, "sport")}}
                    />
                    <span id="sportTxt"></span>
                    </p>
                <p>美术 
                    <Input 
                        width="20%" 
                        onBlur={(e)=>{this.regJugeID(e.target.value, "art")}}
                    />
                    <span id="artTxt"></span>
                </p>
            </Modal>
        )
    }
}

export default connect()(AddStudentInfo);