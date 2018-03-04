import React, { Component } from 'react'
import { Layout, Menu, Icon ,Avatar } from 'antd';
import { connect } from 'dva';

import "./index.less";
import Achievement from "./achievement";
import PersonInfo from "./personInfo";
import Password from "./password";
import Schedule from "./schedule";
import Portrait from "./portrait";

const { Header, Content, Footer, Sider } = Layout;

class Student extends Component {
    constructor(props) {
        super(props)
        this.state={
            view : "SCHEDULE"
        }
    }
    componentWillMount() {
        console.log(this.props.IDS);
        this.props.dispatch({"type" : "user/init_async", id: this.props.IDS})
    }
   

    showView(){
        switch (this.state.view) {
            case "ACHIEVEMENT":
                return <Achievement IDS={this.props.IDS} people={this.props.people}/>
            case "PERSONINFO":
                return <PersonInfo/>
            case "PASSWORD":
                return <Password/>
            case "SCHEDULE":
                return <Schedule/>
            case "PORTRAIT":
                return <Portrait/>
        }
    }
    changeView({key}) {
        var a;
        switch (key) {
            case "1":
                a = "PERSONINFO";
            break;
            case "2":
                a =  "PASSWORD";
            break;
            case "3":
                a =  "ACHIEVEMENT";
            break;
            case "4":
                a =  "SCHEDULE";
            break;
            case "5":
                a = "PORTRAIT";
            break;
        }
        this.setState({
            "view" : a
        })
    }
    render() {
        return (
            <Layout style={{height: "100%"}}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onCollapse={(collapsed, type) => { console.log(collapsed, type)}}
                >
                    <div className="logo" >
                        <Avatar 
                            size="large" 
                            icon="user" 
                            className="head" 
                            src={`../portrait/${this.props.users.url?this.props.users.url : "dog2.jpg"}`}
                            onClick={(e)=>{
                                this.changeView({"key": "5"})
                            }}
                        />
                    </div>
                    <Menu 
                        theme="dark" 
                        mode="inline"  
                        onClick={(e)=>{
                            this.changeView(e)
                        }}
                    >
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span className="nav-text">个人信息</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span className="nav-text">修改密码</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span className="nav-text">成绩查询</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="user" />
                            <span className="nav-text">课表查询</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{height : "100%"}}>
                    <Header style={{ background: '#fff', padding: 0,height: "10%"}} className="midheader">
                        学生成绩管理系统
                    </Header>
                    <Content style={{ margin: '24px 16px 0',background: '#fff' }}>
                        <div style={{ padding: 24, minHeight: 360 }}>
                            {this.showView()}                            
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}
export default connect(
    ({student:{data},user})=>{
        return {
            users : user.users,
            data 
        }
    }
)(Student)