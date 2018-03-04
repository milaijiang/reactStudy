import React, { Component } from 'react'
import { connect } from "dva";
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

class PasswordForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmDirty: false,
            confirms: false
        }
    }

    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        // 密码输入框格式
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 18 },
                sm: { span: 10 },
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        // 提交按钮验证
        const handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    // 发送修改请求
                    this.props.dispatch({
                        "type": "user/changeMessages_async",
                        password: values.password,
                        id: this.props.users.id
                    });

                    this.setState({
                        confirms : true
                    })

                }
            });
        }

        // 确认旧密码是否输入错误
        const checkOldPassword = (rule, value, callback) => {
            const password = this.props.users.password;
            if (password !== value && value) {
                callback("the old password is not right")
            } else {
                callback();
            }
        }

        // 确认密码输入框函数：用于验证是否与之前输入的密码一样
        const checkPassword = (rule, value, callback) => {
            const form = this.props.form;
            if (value && value !== form.getFieldValue('password')) {
                callback('Two passwords that you enter is inconsistent!');
            } else {
                callback();
            }
        }

        // 自定义的校验规则
        const checkConfirm = (rule, value, callback) => {
            const form = this.props.form;
            if (value && this.state.confirmDirty) {
                form.validateFields(['confirm'], { force: true });
            }
            callback();
        }
        return (
            <div>
                {   
                    !this.state.confirms
                    ?
                    <Form onSubmit={handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="Old Password"
                        >
                            {getFieldDecorator('oldpassword', {
                                rules: [{
                                    required: true, message: 'Please input your old password!',
                                }, {
                                    validator: checkOldPassword,
                                }],
                            })(
                                <Input type="password" />
                                )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="New Password"
                        >
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: 'Please input your new password!',
                                }, {
                                    validator: checkConfirm,
                                }],
                            })(
                                <Input type="password" />
                                )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Confirm Password"
                        >
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: 'Please confirm your password!',
                                }, {
                                    validator: checkPassword,
                                }],
                            })(
                                <Input type="password" onBlur={(e) => { this.handleConfirmBlur(e) }} />
                                )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">Register</Button>
                        </FormItem>
                    </Form>
                    :
                    <div>
                        修改成功！！！
                    </div>
                }
            </div>
        )
    }
}

const Password = Form.create()(PasswordForm);
export default connect(
    ({ user }) => {
        return ({
            users: user.users
        })
    }
)(Password);