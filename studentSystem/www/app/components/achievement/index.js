/**成绩列表模块*****/

import React, { Component } from 'react'
import { Table, Select , Popconfirm , Input, Modal, Button } from "antd";
import { connect } from 'dva';
import * as R from "ramda";

import AddStudentInfo from "./AddStudentInfo.js";

const Option = Select.Option;

class Achievement extends Component {
    constructor(props){
        super(props)
        this.state = {
            year : "2014",
            _e : "Up",
            xueqi : "上学期",
            data : null,
            isShowAdd : false
        }
        this.cachedata = null;
        
        if(this.props.people == "students") {
            props.dispatch({"type":"student/inits_async" ,id : this.props.IDS})
        } else if(this.props.people == "teachers"){
            props.dispatch({"type":"student/init_async"})
        }

    }

    // 将初始数据存入缓存内
    componentWillReceiveProps(nextProps) {
        this.cachedata = nextProps.data.map(item=>({...item}));
        this.state.data = nextProps.data;
    }

    // 用于编辑信息
    renderColumns(text, record, column) {
        return (
        <div>
            {record.editable
              ? <Input 
                    style={{ margin: '-5px 0' }} 
                    value={text}  
                    onChange={e => this.handleChange(e.target.value, record.id, column)}
              />
              : text
            }
        </div>
        );
    }

    // 改变内容
    handleChange(value, id, column) {
        const data = this.state.data;
        const target = data.filter(item=>item.id == id)[0];
        if(target) {
            target[column] = value;
            this.setState({
                data
            })
        }
    }
    // 编辑
    edit (id) {
        const data = this.props.data;
        const target = data.filter(item=>item.id == id)[0];
        if(target) {
            target.editable = true; 
            this.setState({
                data
            })
        }        
    }

    // 保存
    save (id) {
        const data = this.state.data;
        const target = data.filter(item=>item.id == id)[0];
         if(target) {
            delete target.editable;
            this.setState({
                data
            })
            // 发送请求
            this.props.dispatch({
                "type" : "student/change_async",
                target, 
                id, 
                year: this.state.year,
                xueqi: this.state._e})
            this.cachedata = data.map(item => ({ ...item }));
        }        
    }

    // 取消
    cancel (id) {
        const target = this.props.data.filter(item=>item.id == id)[0];
        const data = this.props.data;
        if(target) {
            // 将缓存内的原数据克隆出来
            Object.assign(target, this.cachedata.filter(item => id === item.id)[0]);
            delete target.editable;
            this.setState({
                data
            })
            
        }        
    }

    // 删除
    onDelete(id) {
        var data = this.state.data;
        data = data.filter(item=>item.id !== id);
        this.setState({data})
        this.props.dispatch({
            "type" : "student/delete_async", 
            id,
            year: this.state.year,
            xueqi: this.state._e
        })
    }

    // 显示添加学生信息框
    showAdd(e) {
        this.setState({
            isShowAdd : e
        })
    }

    // 变更年代时拉去数据
    changeYear(e) {
        this.setState({"year" : e,"xueqi" : "上学期"})
        this.props.dispatch({
            "type" : "student/init_async", 
            year : e, 
            xueqi : "Up"
        })
    }

    // 变更学期时拉去数据
    changeXueqi(e) {
        var _e;
        if (e == "上学期") { _e = "Up" }
        else if (e == "下学期") { _e = "Down" }
        this.setState({ "xueqi": e, _e })
        this.props.dispatch({
            "type": "student/init_async",
            year: this.state.year,
            xueqi: _e
        })
    }

    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
                sorter: (a, b) => a.id - b.id,
                render : (text, record)=> this.renderColumns(text, record, "id")
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render : (text, record)=> this.renderColumns(text, record, "name")
                
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                filters: [{
                    text: '男',
                    value: '男',
                  }, {
                    text: '女',
                    value: '女',
                  }],
                filterMultiple: false,
                onFilter: (value, record) => record.sex.indexOf(value) === 0,
                render : (text, record)=> this.renderColumns(text, record, "sex")
                
            },
            {
                title: '班级',
                dataIndex: 'class',
                key: 'class',
                filters: [{
                    text: '三年一班',
                    value: '三年一班',
                  }, {
                    text: '三年二班',
                    value: '三年二班',
                  },{
                    text: '三年三班',
                    value: '三年三班',
                  }],
                filterMultiple: true,
                onFilter: (value, record) => record.class.indexOf(value) === 0,
                render : (text, record)=> this.renderColumns(text, record, "class")
                
            },
            {
            title: '数学',
            dataIndex: 'math',
            key: 'math',
            sorter: (a, b) => a.math - b.math,
            render : (text, record)=> this.renderColumns(text, record, "math")
            
          }, {
            title: '语文',
            dataIndex: 'chinese',
            key: 'chinese',
            sorter: (a, b) => a.chinese - b.chinese,
            render : (text, record)=> this.renderColumns(text, record, "chinese")
            
          }, {
            title: '英语',
            dataIndex: 'english',
            key: 'english',
            sorter: (a, b) => a.english - b.english,
            render : (text, record)=> this.renderColumns(text, record, "english")
          },
          {
            title: '体育',
            dataIndex: 'sport',
            key: 'sport',
            sorter: (a, b) => a.sport - b.sport,
            render : (text, record)=> this.renderColumns(text, record, "sport")
          },
          {
            title: '美术',
            dataIndex: 'art',
            key: 'art',
            sorter: (a, b) => a.art - b.art,
            render : (text, record)=> this.renderColumns(text, record, "art")
          },
          {
            title: 'operation',
            dataIndex: 'operation',
            fixed: 'right',
            width: 130,
            render: (text, record) => {
              const { editable } = record;
              return (
                  <div className="editable-row-operations">
                      {
                        editable ?
                        <span>
                            <a onClick={() => this.save(record.id)}>Save</a>
                            <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.id)}>
                                <a>Cancel</a>
                            </Popconfirm>
                        </span>
                        :
                        <div>
                            <a onClick={() => this.edit(record.id)}>Edit</a>
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.id)}>
                                <a href="#">Delete</a>
                            </Popconfirm>
                        </div>
                      }
                  </div>
              );
            },
          }
        ];

        return (
          <div className="achievement">
                <div className="selectbox">
                    <Select 
                        value={this.state.year} 
                        style={{ width: 100 }} 
                        className="select" 
                        onChange={(e)=>{this.changeYear(e)}}
                    >
                        <Option value="2014">2014</Option>
                        <Option value="2015">2015</Option>
                        <Option value="2016" >2016</Option>
                        <Option value="2017">2017</Option>
                    </Select>
                    <Select 
                        value={this.state.xueqi} 
                        onChange={(e)=>{this.changeXueqi(e)}}
                        className="select"
                    >
                        <Option value="上学期">上学期</Option>
                        <Option value="下学期">下学期</Option>
                    </Select>
                    <Button className="addbtn" onClick={()=>{this.showAdd(true)}}>添加学生成绩</Button>
                </div>
                
                <Table 
                    rowKey="id"
                    dataSource={this.state.data} 
                    columns={columns} 
                    scroll={{ x: 1500}} 
                />

                {
                    this.state.isShowAdd 
                    ?
                    <AddStudentInfo 
                        data={this.state.data}
                        isShowAdd={this.state.isShowAdd}
                        showAdd={this.showAdd.bind(this)}
                    />
                    :
                    null
                }
            </div>
        )
    }
}
export default connect(
  ({student:{data},user})=> {
    return ({
      data
    })
  }
)(Achievement)  