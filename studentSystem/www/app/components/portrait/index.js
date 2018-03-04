import React, { Component } from 'react';
import { Button } from "antd";

import CutPortrait from "./cutPortrait.js";

export default class Portrait extends Component {
    constructor(props){
        super()
        this.state = {
            isShow : false,
            defaultimgs : "dog2.jpg"
        }
        this.loadData()
    }

    // 切换到选图片视图
    changeShow(e, url=this.state.defaultimgs){
        this.setState({
            "isShow" : e,
            "defaultimgs" : url
        })
    }

    // 拉取默认数据
    async loadData(){
        const {results} = await fetch("/user/100001").then(data=>data.json());
        $(this.refs.imgs).attr("src",`/portrait/${results.url}`)
    }
    
    render() {
        return (
            <div className="portrait">
                {
                    !this.state.isShow ?
                    <div className="lit_box">
                        <img src={`../portrait/${this.state.defaultimgs}`} alt="头像" ref="imgs"/>
                        <p>
                            <span >是否要修改头像？</span>
                            <Button className="btn" onClick={()=>{this.changeShow(true)}}>确定</Button>
                            <Button>取消</Button>
                        </p>
                    </div>
                    :
                    <CutPortrait
                        imgs={this.refs.imgs}
                        defaultimgs={this.state.defaultimgs}
                        changeShow={this.changeShow.bind(this)}
                    />
                }
            </div>
        )
    }
}
