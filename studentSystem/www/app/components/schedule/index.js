import React, { Component } from 'react'
import { Tabs, Radio, Card, Icon, Avatar, Col, Row, Divider, Button, Timeline } from 'antd';
import { connect } from "dva";
const TabPane = Tabs.TabPane;
const { Meta } = Card;

class Schedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            key: "0"
        },
        props.dispatch({ "type": "schedule/init_async" })
    }

    // 同步日期
    componentWillMount() {
        const date = new Date();
        var weekday = date.getDay();

        this.setState({
            key: String(weekday - 1)
        })
    }

    render() {
        const gridStyle = {
            width: '200px',
            textAlign: 'center',
            marginBottom: '20px'
        };
        
      
        return (

            <div className="schedule">

               
                <Tabs
                    defaultActiveKey={this.state.key}
                    tabPosition="top"
                    size="large"
                >   
                    {
                        this.props.schedules.map((element, index) => {
                            return (
                                <TabPane tab={element.name} key={index}>
                                    <Timeline>
                                        <Timeline.Item>
                                        上午课程：
                                        <Divider />
                                            <Row span={12}>
                                                {element.mission[0].morning.map((item, i) => {
                                                    return (
                                                        <Col span={6} key={i}>
                                                            <Card
                                                                type="inner"
                                                                style={gridStyle}
                                                            >
                                                                <Meta

                                                                    title={item.course}
                                                                    description={item.adress}
                                                                />
                                                            </Card>
                                                        </Col>
                                                    )
                                                })}
                                            </Row>
                                        </Timeline.Item>
                                        <Timeline.Item>
                                            下午课程：
                                            <Divider />
                                            <Row span={12}>
                                                {element.mission[1].afternoon.map((item, i) => {
                                                    return (
                                                        <Col span={6} key={i}>
                                                            <Card
                                                                type="inner"
                                                                style={gridStyle}
                                                            >
                                                                <Meta

                                                                    title={item.course}
                                                                    description={item.adress}
                                                                />
                                                            </Card>
                                                        </Col>
                                                    )
                                                })}
                                            </Row>
                                        </Timeline.Item>
                                    </Timeline>
                                </TabPane>
                            )
                        })
                    }
                    {/* <TabPane tab="Monday" key="1"></TabPane>
                    <TabPane tab="Tuesday" key="2">Content of tab 2</TabPane>
                    <TabPane tab="Wednesday" key="3">Content of tab 3</TabPane>
                    <TabPane tab="Thursday" key="4">Content of tab 4</TabPane>
                    <TabPane tab="Friday" key="5">Content of tab 5</TabPane>
                    <TabPane tab="Saturday" key="6">Content of tab 6</TabPane>
                    <TabPane tab="Sunday" key="0">

                        <Timeline>
                            <Timeline.Item>
                                上午课程：
                                <Divider />
                                <Row span={12}>
                                </Row>
                            </Timeline.Item>
                            <Timeline.Item>
                                下午课程：
                                <Divider />
                                <Row span={12}>
                                    <Col span={6}>
                                        <Card
                                            type="inner"
                                            style={gridStyle}
                                            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                        >
                                            <Meta

                                                title="美术"
                                                description="sadsadsasasadsadassadsadsadasdsa"
                                            />
                                        </Card>
                                    </Col>
                                    <Col span={6}>
                                        <Card
                                            type="inner"
                                            style={gridStyle}
                                            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                        >
                                            <Meta
                                                title="音乐"
                                                description="This is the description"
                                            />
                                        </Card>
                                    </Col>

                                </Row>
                            </Timeline.Item>

                        </Timeline>

                    </TabPane> */}
                </Tabs>
            </div>
        )
    }
}

export default connect(
    ({ schedule }) => {
        return ({
            schedules: schedule.schedules
        })
    }
)(Schedule);
