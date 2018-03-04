import React, { Component } from 'react'
import { Card, Col, Row  } from 'antd';
const { Meta } = Card;

export default class Select extends Component {
    constructor(props) {
        super()
    }
    change(e){
        this.props.changeModel(e)
    }
    render() {

     
        return (
            <div style={{position : "relative",width : 500, margin : "0 auto", top : "150px"}}>
                <Row gutter={20}>
                    <Col span={10}>
                        <Card
                        onClick ={()=>{
                            this.change("logo")
                            this.props.select("students")
                        }}
                            hoverable="true"
                            style={{ width: 200 ,textAlign:'center'
                            }}
                            cover={<img src="../images/dog2.jpg" style={{height : "200px"}}/>}
                        >
                            <Meta
                                title="学生"
                                description="登录请点击"
                            />
                        </Card>
                    </Col>
                    <Col span={10}>
                        <Card
                            hoverable="true"
                            style={{ width: 200, textAlign:'center'}}
                            cover={<img src="../images/xuzheng.jpg" style={{height : "200px"}}/>}
                            onClick ={()=>{
                                this.change("logo")
                                this.props.select("teachers")
                            }}
                        >
                            <Meta
                                title="教师登录"
                                description="登录请点击"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
