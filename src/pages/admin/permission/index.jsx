import React from 'react';

import { Table, Button, Card, Dialog, Form, Input, Switch, Select, Message, Tree, Layout, MessageBox } from 'element-react';
import { Link } from 'react-router-dom';

import PermissionServer from 'servers/permission.jsx';



export default class Permission extends React.Component {
    _permission = null;
    constructor(porps) {
        super(porps);
        this._permission = new PermissionServer();
        this.state = {
            data: [],
            dialogVisible3: false,
            form: {
                id: 0,
                name: "",
                type: "",
                url: "",
                sort: "",
                p_id: 0
            },
            tree: [],
            rules: {
                name: [
                    { required: true, message: '请输入权限名称', trigger: 'blur' },
                ],
                url: [
                    { required: true, message: '请输入系统调用名', trigger: 'blur' }
                ]
            }
        };

        this._permission.tree().then(
            (res) => {
                this.setState({
                    data: res.data.data
                });
            }
        );

        this._permission.list().then(
            (res) => {
                this.setState({
                    tree: res.data.data
                });
            }
        )
    }
    /*点击编辑*/
    onDialog(row) {
        row.type = row.type == 1 ? true : false;
        this.setState({
            form: row,
            dialogVisible3: true
        });
    }
    /*编辑权限操作*/
    onEditorRow() {
        this._permission.update(this.state.form).then(
            (res) => {
                const _data = res.data;
                const { data } = this.state;
                if (_data.code === 20000) {
                    Message({
                        type: 'success',
                        message: _data.msg
                    })

                    this._permission.tree().then(
                        (res) => {
                            this.setState({
                                data: res.data.data
                            })
                        }
                    )
                }
            }
        );
    }
    /*表单数据变更*/
    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        });
    }
    /*删除权限*/
    deleteRow(row) {

        MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            type: 'warning'
        }).then(() => {
            this._permission.delete(row.id).then(
                (res) => {
                    const _data = res.data;
                    Message({
                        type: 'success',
                        message: _data.msg
                    });
                    this._permission.tree().then(
                        (res) => {
                            this.setState({
                                data: res.data.data
                            });
                        }
                    );
                }
            );
        }).catch(() => {
            Message({
                type: 'info',
                message: '已取消删除'
            });
        });


    }
    /*自定义Tree显示*/
    renderContent(nodeModel, data, store) {

        return (
            <span>
                <span>
                    <span>{data.name}</span>
                </span>
                <span style={{ float: 'right', marginRight: '20px' }}>
                    <Button size="mini" onClick={() => this.onDialog(data)}>编辑</Button>
                    <Button size="mini" onClick={() => this.deleteRow(data)}>删除</Button>
                </span>
            </span>);
    }
    /*添加数据*/
    addPermission() {
        var newData = {
            id: 0,
            name: "",
            type: "",
            url: "",
            sort: "",
            p_id: 0
        };

        this.setState({
            form: newData,
            dialogVisible3: false
        });
    }
    /*显示Form的按钮*/
    showFromButton() {
        if (this.state.dialogVisible3) {
            return <Button type="primary" onClick={this.onEditorRow.bind(this)}>保存</Button>
        } else {
            return <Button type="primary" onClick={this.addPermissionSubmit.bind(this)}>提交</Button>
        }
    }

    /*添加新权限*/
    addPermissionSubmit() {
        this.refs.form.validate((valid) => {
            if (valid) {
                this._permission.create(this.state.form).then(
                    (res) => {
                        Message({
                            type: res.data.code == 20000 ? 'success' : 'error',
                            message: res.data.msg
                        });
                        this._permission.tree().then(
                            (res) => {
                                this.setState({
                                    data: res.data.data
                                });
                            }
                        );
                    }
                );
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    }

    render() {

        const options = {
            label: 'name',
            children: 'son'
        };

        return (
            <div class="admin-content">

                <Layout.Row gutter="20">
                    <Layout.Col span="12">
                        <Card header={
                            <div className="clearfix">
                                <span style={{ "lineHeight": "36px" }}>
                                    权限列表
                                </span>
                                <span style={{ "float": "right" }}>
                                    <Button type="primary" icon="plus" onClick={() => this.addPermission()}>
                                        新增
                                    </Button>
                                </span>
                            </div>
                        }>

                            <Tree
                                data={this.state.data}
                                options={options}
                                nodeKey="id"
                                defaultExpandAll={true}
                                expandOnClickNode={false}
                                renderContent={(...args) => this.renderContent(...args)}
                            />

                        </Card>
                    </Layout.Col>

                    <Layout.Col span="12">

                        <Card>
                            <Form ref="form" labelPosition="left" model={this.state.form} rules={this.state.rules}>

                                <Form.Item label="上级" prop="p_id" labelWidth="120">
                                    <Select value={this.state.form.p_id} onChange={this.onChange.bind(this, 'p_id')}>
                                        {
                                            this.state.tree.map(el => {
                                                return <Select.Option key={el.id} label={el.name} value={el.id} />
                                            })
                                        }
                                    </Select>
                                </Form.Item>

                                <Form.Item label="权限名称" prop="name" labelWidth="120">
                                    <Input type="text" value={this.state.form.name} onChange={this.onChange.bind(this, 'name')} autoComplete="off" />
                                </Form.Item>

                                <Form.Item label="系统调用名" prop="url" labelWidth="120">
                                    <Input type="text" value={this.state.form.url} onChange={this.onChange.bind(this, 'url')} autoComplete="off" />
                                </Form.Item>

                                <Form.Item label="排序" prop="sort" labelWidth="120">
                                    <Input type="text" value={this.state.form.sort} onChange={this.onChange.bind(this, 'sort')} autoComplete="off" />
                                </Form.Item>

                                <Form.Item label="是否菜单" prop="type" labelWidth="120">
                                    <Switch onText="是" offText="否" value={this.state.form.type} onChange={this.onChange.bind(this, 'type')}></Switch>
                                </Form.Item>

                                <Form.Item labelWidth="120">
                                    {this.showFromButton()}
                                </Form.Item>

                            </Form>
                        </Card>

                    </Layout.Col>
                </Layout.Row>

            </div>
        );
    }
}