import React, { Component } from 'react'
import { connect } from "dva";
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmDirty: false,
        };
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        // const { autoCompleteResult } = this.state;
    
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
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

        const handleSubmit = (e) => {
            var self = this;
            e.preventDefault();
            this.props.form.validateFieldsAndScroll((err, values) => {
                var target = {};
                target.id = values.number;
                target.password = values.password;
                target.username = values.nickname;
                target.sex = "男";
                if (!err) {
                    console.log(values);
                    console.log(target);
                    
                    $.post("/user" ,target,function(data){
                        if(data.result == 1){
                            alert("注册成功！");
                            self.props.changeModel("logo")
                        }else if (data.result == -2){
                            alert("学号重复！");
                        }
                    })
                }
            });
        }
        
        const handleConfirmBlur = (e) => {
            const value = e.target.value;
            this.setState({ confirmDirty: this.state.confirmDirty || !!value });
          }
        const checkPassword = (rule, value, callback) => {
            const form = this.props.form;
            if (value && value !== form.getFieldValue('password')) {
              callback('Two passwords that you enter is inconsistent!');
            } else {
              callback();
            }
          }
        const checkConfirm = (rule, value, callback) => {
            const form = this.props.form;
            if (value && this.state.confirmDirty) {
              form.validateFields(['confirm'], { force: true });
            }
            callback();
          }
        
        return (
            <Form onSubmit={handleSubmit} style={{"maxWidth" : "500px", "margin" : "0px auto"}}>
                <FormItem
                    {...formItemLayout}
                    label="学号"
                >
                    {getFieldDecorator('number', {
                        rules: [
                            {
                                len: 6, message: 'Please enter the number of six digits!',
                            },{
                            required: true, message: 'Please input your IDnumber!',
                        }],
                    })(
                        <Input type="number"/>
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Password"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
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
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                            Nickname&nbsp;
                    <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}
                >
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                        )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Register</Button>
                </FormItem>
            </Form>
        )
    }
}

const Regist = Form.create()(RegistrationForm);
export default connect()(Regist);