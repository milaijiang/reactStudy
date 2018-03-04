import React, { Component } from 'react'
import { connect } from "dva";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class logoForm extends Component {
    constructor(props){
        super(props)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 6 },
        }
        const handleSubmit = (e) => {
            var self = this;
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                var x = values.userName;
              if (!err) {
                $.post("/user" , {
                    "id"  : values.userName,
                    "password" : values.password
                },function(data){
                    if(data.result == 1){
                        alert("登录成功！");
                        self.props.changeModel("student", x)
                    }else{
                        alert("用户名不存在或密码错误！");
                    }
                })
              }
            });
        }
        return (
                <Form onSubmit={handleSubmit} className="login-form" layout="horizontal">
                    <FormItem 
                    >
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                    </FormItem>
                    <FormItem
                    >
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                    </FormItem>
                    <FormItem
                    >
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="javascript:void(0);" onClick={()=>{this.props.changeModel("regist")}}>register now!</a>
                    </FormItem>
            </Form>
        )
    }
};
const Logo = Form.create()(logoForm);

export default connect(
    ({user})=>{
        return {
            users : user.users
        }
    }
)(Logo);
