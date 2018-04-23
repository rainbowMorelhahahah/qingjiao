import React from 'react';
import { Form, Input, Button, Card, Checkbox, Message } from 'element-react';
import { Link } from 'react-router-dom';

import Auth from 'servers/auth.jsx';
import PregMatch from 'util/preg_match.jsx';

import './index.scss';

const _auth = new Auth();
const _pregmatch = new PregMatch();

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: '',
                password: '',
                password_confirmation: ''
            },
            rules: {
                //邮箱认证
                email: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请输入用户名'));
                            } else if (!_pregmatch.email(value)) {
                                callback(new Error('必须填写邮箱地址'));
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                //密码
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if (value.length < 6) {
                                callback(new Error('密码不得少于6位'));
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                //确认密码校验
                password_confirmation: [
                    { required: true, message: '请输入确认密码', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if (this.state.form.password !== this.state.form.password_confirmation) {
                                callback(new Error('密码和确认密码不一致'));
                            } else if (value.length < 6) {
                                callback(new Error('确认密码不得少于6位'));
                            } else {
                                callback();
                            }
                        }
                    }
                ]
            }
        };
    }
    //表单更改后变动
    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        });
    }

    async handleSubmit(e) {
        e.preventDefault();

        this.refs.form.validate((valid) => {
            if (valid) {

                _auth.register(this.state.form).then(
                    (res) => {
                        console.log(res);
                        var data = res.data;

                        Message({
                            message: data.msg,
                            type: data.code == 20000 ? 'success' : 'error'
                        });

                        if (data.code == 20000) {
                            setTimeout(() => {
                                this.props.history.push('/login');
                            }, 1000);
                        }
                    }
                );

            } else {
                console.log('error submit!!');
                return false;
            }
        });
    }

    render() {
        return (
            <Card className="register-box">
                <div class="register-hd">
                    <h2>注册</h2>
                </div>
                <div class="register-bd">
                    <Form ref="form" labelPosition="top" model={this.state.form} rules={this.state.rules} labelWidth="100">
                        <Form.Item label="" prop="email">
                            <Input type="text" value={this.state.form.email} onChange={this.onChange.bind(this, 'email')} autoComplete="off" placeholder="请输入账号" />
                        </Form.Item>
                        <Form.Item label="" prop="password">
                            <Input type="password" value={this.state.form.password} onChange={this.onChange.bind(this, 'password')} autoComplete="off" placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item label="" prop="password_confirmation">
                            <Input type="password" value={this.state.form.password_confirmation} onChange={this.onChange.bind(this, 'password_confirmation')} autoComplete="off" placeholder="请输入确认密码" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={this.handleSubmit.bind(this)} className="btn-register">注册</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div class="register-fd"></div>
            </Card>
        );
    }
}

export default Register;