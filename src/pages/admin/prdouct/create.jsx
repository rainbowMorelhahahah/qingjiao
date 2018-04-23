import React from 'react';
import { Card, Form, Input, Upload, Button, Dialog, Switch, Message, Radio } from 'element-react';
import UmEditor from 'components/umeditor/index.jsx';

import conf from 'config/app.js';

import Design from 'servers/desigen.jsx';
const _design = new Design();

export default class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                title: '',
                thumb: '',
                photos: [],
                status: true,
                desc: '',
                url: '',
                pType: 0,
                content: ''
            },
            dialogVisible: false,
            dialogImageUrl: ''
        };
    }

    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        });
    }

    handleUploadImage(res, file) {
        this.setState({
            form: Object.assign({}, this.state.form, { thumb: res.url })
        });
    }

    handlePictureCardPreview(file) {
        this.setState({
            dialogImageUrl: file.url,
            dialogVisible: true,
        })
    }
    /**
     * 上传图片成功的照片
     * @param {*} res 网络响应
     * @param {*} file 文件对象
     */
    handlePictureSuccess(res, file) {
        const { photos } = this.state.form;

        photos.push(res.url);
        this.setState({
            form: Object.assign({}, this.state.form, { photos: photos })
        });
    }
    /**
     * 
     * @param {*} file 
     * @param {*} fileList 
     */
    handleRemove(file, fileList) {
        console.log(file, fileList);
    }
    /**
     * 选择发布类型的显示形式
     */
    showHideRadioContent() {
        const { dialogVisible, dialogImageUrl } = this.state;
        if (this.state.form.pType == 1) {
            return (
                <Form.Item label="照片墙" ref="photos">
                    <Upload
                        action={conf.appUrl + '/uploader'}
                        listType="picture-card"
                        onPreview={file => this.handlePictureCardPreview(file)}
                        onRemove={(file, fileList) => this.handleRemove(file, fileList)}
                        multiple={true}
                        onSuccess={(res, file) => { this.handlePictureSuccess(res, file) }}
                    >
                        <i className="el-icon-plus"></i>
                    </Upload>

                    <Dialog
                        visible={dialogVisible}
                        size="tiny"
                        onCancel={() => this.setState({ dialogVisible: false })}
                    >
                        <img width="100%" src={dialogImageUrl} alt="" />
                    </Dialog>
                </Form.Item>
            );
        } else if(this.state.form.pType == 2) {
            return (
                <Form.Item label="内容">
                    <UmEditor onChange={this.onChange.bind(this,'content')} initialContent={this.state.form.content} />
                </Form.Item>
            );
        }
    }

    handleSubmit() {
        console.log(this.state.form);
        _design.create(this.state.form).then(
            (res) => {
                const _data = res.data;
                Message({
                    type: _data.code == 20000 ? "success" : "error",
                    message: _data.msg
                })

                this.props.history.goBack();
            }
        );
    }

    render() {
        const { dialogVisible, dialogImageUrl } = this.state;
        return (
            <div class="admin-content">
                <Card header={
                    <div className="clearfix">
                        <span style={{ "lineHeight": "36px" }}>
                            新增设计
                        </span>
                    </div>
                }>
                    <Form labelWidth="80">
                        <Form.Item label="标题" className="max-form">
                            <Input type="text" value={this.state.form.title} onChange={this.onChange.bind(this, 'title')} autoComplete="off" />
                        </Form.Item>

                        <Form.Item label="描述" className="max-form">
                            <Input type="textarea" value={this.state.form.desc} autosize={{ minRows: 3, maxRows: 5 }} onChange={this.onChange.bind(this, 'desc')} autoComplete="off" />
                        </Form.Item>

                        <Form.Item label="购物链接" className="max-form">
                            <Input type="text" value={this.state.form.url} onChange={this.onChange.bind(this, 'url')} autoComplete="off" />
                        </Form.Item>

                        <Form.Item label="缩略图">
                            <Upload
                                action={conf.appUrl + '/uploader'}
                                onSuccess={(res, file) => { this.handleUploadImage(res, file) }}
                            >
                                <Button size="small" type="primary">点击上传</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item label="发布类型">
                            <Radio value="1" checked={this.state.form.pType === 1} onChange={this.onChange.bind(this, 'pType')}>备选项</Radio>
                            <Radio value="2" checked={this.state.form.pType === 2} onChange={this.onChange.bind(this, 'pType')}>备选项</Radio>
                        </Form.Item>

                        {this.showHideRadioContent()}

                        <Form.Item label="状态">
                            <Switch
                                value={this.state.form.status}
                                onText="是"
                                offText="否"
                            >
                            </Switch>
                        </Form.Item>

                        <Form.Item>
                            <Button type="success" onClick={this.handleSubmit.bind(this)}>提交</Button>
                        </Form.Item>
                    </Form>

                </Card>
            </div>
        );
    }
}














