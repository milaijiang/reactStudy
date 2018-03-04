import React, { Component } from 'react'
import { connect } from "dva";

class PersonInfo extends Component {
    render() {
        const {username, sex, id} = this.props.users;
        return (
            <div className="personinfo">
            
                <ul>
                    <li><b>姓名:</b><span>{username}</span></li>
                    <li><b>性别:</b><span>{sex}</span></li>
                    <li><b>学号:</b><span>{id}</span></li>
                    <li><b>班级:</b><span>三年二班</span></li>
                    <li><b>民族:</b><span>汉</span></li>
                    <li><b>国籍:</b><span>中国</span></li>
                </ul>
                <div className="pics">
                    <img src={`../portrait/${this.props.users.url?this.props.users.url : "dog2.jpg"}`} alt=""/>
                </div>
            </div>
        )
    }
}

export default connect(
    ({user})=>{
        return {
            users : user.users,
        }
    }
)(PersonInfo);