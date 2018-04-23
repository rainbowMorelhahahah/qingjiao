import React from 'react';
import { Card, Form, Input, Button, Checkbox, Message } from 'element-react';
import { Link } from 'react-router-dom';
import storejs from 'storejs';

import Auth from 'servers/auth.jsx';
import PregMatch from 'util/preg_match.jsx';
import MMUtil from 'util/mm.jsx';

import './login.scss';

const _auth = new Auth();
const _preg_match = new PregMatch();
const _mm = new MMUtil();

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: '',
                password: ''
            },
            rules: {
                email: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请输入用户名'));
                            } else if (!_preg_match.email(value)) {
                                callback(new Error('请填写正确的邮箱密码'));
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请输入密码'));
                            } else {
                                callback();
                            }
                        }
                    }
                ]
            }
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        this.refs.form.validate((valid) => {
            if (valid) {
                _auth.login(this.state.form).then(
                    (res) => {
                        var _data = res.data;

                        Message({
                            type: _data.code == 20000 ? 'success' : 'error',
                            message: _data.msg
                        });

                        if (_data.code == 20000) {
                            var _token = _data.data.token;
                            storejs.set('token', _token);
                            const redirect = _mm.getParam('redirect') || '/';
                            this.props.history.replace(redirect);
                        }
                    }
                );

            } else {
                Message({
                    type: 'error',
                    message: '请填写数据的完整性'
                });
                return false;
            }
        });
    }

    handleReset(e) {
        e.preventDefault();
        history.go(-1);
    }

    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        });
    }

    render() {
        return (
            <Card className="login-box">
                <div class="login-hd">
                    <h2>登录</h2>
                </div>
                <div class="login-bd">
                    <Form ref="form" labelPosition="top" model={this.state.form} rules={this.state.rules} labelWidth="100">
                        <Form.Item label="" prop="email">
                            <Input type="text" value={this.state.form.email} onChange={this.onChange.bind(this, 'email')} autoComplete="off" placeholder="请输入账号" />
                        </Form.Item>
                        <Form.Item label="" prop="password">
                            <Input type="password" value={this.state.form.password} onChange={this.onChange.bind(this, 'password')} autoComplete="off" placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item label="">
                            <Checkbox.Group value={this.state.form.type} onChange={this.onChange.bind(this, 'type')}>
                                <Checkbox label="自动登录" name="type"></Checkbox>
                            </Checkbox.Group>
                            <Link to="/" className="forget">忘记密码?</Link>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={this.handleSubmit.bind(this)} className="btn-login">登录</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div class="login-fd">
                    <Link to="/register" className="">还没有账号?点击注册</Link>
                </div>
            </Card>
        );
    }
}

export default Index;
