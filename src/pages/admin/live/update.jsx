import React from 'react';
import { Form, Input, Switch, Button, Card, Upload, Message } from 'element-react';
import QRCode from 'qrcode-react';

import conf from 'config/app.js';

import LiveServer from 'servers/live.jsx';



class Create extends React.Component {
    _live = null;
    constructor(props) {
        super(props);
        this._live = new LiveServer();

        this.state = {
            form: {
                title: '',
                status: 0,
                desc: '',
                src: '',
                thumb: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入相册名称', trigger: 'blur' },
                ],
                src: [
                    { required: true, message: '请输入喔图链接', trigger: 'blur' }
                ]
            },
            dialogImageUrl: '',
            dialogVisible: false
        };

        var _params = this.props.match.params;

        this._live.get(_params.id).then(
            (res) => {
                let _data = res.data;
                res.data.life.status = res.data.life.status == 0 ? false : true;
                console.log(_data.life);
                this.setState({
                    form: _data.life
                });
            }
        )

    }

    handleSubmit(e) {
        e.preventDefault();

        this.refs.form.validate((valid) => {
            if (valid) {

                this._live.update(this.props.match.params.id, this.state.form).then(
                    (res) => {
                        let _data = res.data;
                        Message({
                            type: _data.code == 20000 ? 'success' : 'error',
                            message: _data.msg
                        });

                        if (_data.code == 20000) {
                            setTimeout(() => {
                                this.props.history.goBack()
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

    handleReset(e) {
        e.preventDefault();
        history.go(-1);
    }

    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        });
    }

    handleAvatarScucess(res, file) {
        this.setState({
            form: Object.assign({}, this.state.form, { thumb: conf.staticUrl + res.url })
        })
    }

    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
            Message('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
            Message('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    }

    render() {
        const { dialogImageUrl, dialogVisible } = this.state;

        return (
            <div class="admin-content">

                <Card>
                    <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="100" className="max-form">
                        <Form.Item label="相册名称" prop="title">
                            <Input type="text" value={this.state.form.title} onChange={this.onChange.bind(this, 'title')} autoComplete="off" />
                        </Form.Item>

                        <Form.Item label="相册描述">
                            <Input type="textarea" value={this.state.form.desc} onChange={this.onChange.bind(this, 'desc')}></Input>
                        </Form.Item>

                        <Form.Item label="相册链接" prop="src">
                            <Input type="text" value={this.state.form.src} onChange={this.onChange.bind(this, 'src')} autoComplete="off" />
                        </Form.Item>

                        <Form.Item label="相册封面">

                            <div class="avatar-box">
                                <Upload
                                    className="avatar-uploader"
                                    action={conf.appUrl + '/uploader'}
                                    showFileList={false}
                                    onSuccess={(res, file) => this.handleAvatarScucess(res, file)}
                                    beforeUpload={file => this.beforeAvatarUpload(file)}
                                >
                                    {this.state.form.thumb ? <img src={this.state.form.thumb} className="avatar" /> : <i className="el-icon-plus avatar-uploader-icon"></i>}
                                </Upload>
                            </div>

                            <div className="QRCode">
                                <QRCode value="http://www.baidu.com" size="178" />
                            </div>

                        </Form.Item>


                        <Form.Item label="状态">
                            <Switch
                                onText=""
                                offText=""
                                value={this.state.form.status}
                                onChange={this.onChange.bind(this, 'status')}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" onClick={this.handleSubmit.bind(this)}>提交</Button>
                            <Button onClick={this.handleReset.bind(this)}>返回</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Create;