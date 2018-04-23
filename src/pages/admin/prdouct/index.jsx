import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Upload, Button, Dialog, Switch, Layout, MessageBox, Message } from 'element-react';

import conf from 'config/app.js';

import Design from 'servers/desigen.jsx';

import Masonry from 'react-masonry-component';

export default class Index extends React.Component {
    _design = null;
    constructor(props) {
        super(props);
        this._design = new Design();

        this.state = {
            list: [],
        };

        this._design.getList({}).then(
            (res) => {
                this.setState({
                    list: res.data.data.data
                });
            }
        )

    }

    handlDoDelete(row) {
        MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            type: 'warning'
        }).then(() => {

            this._design.delete(row.id).then(
                (res) => {
                    const _data = res.data;
                    Message({
                        type: 'success',
                        message: _data.msg
                    });
                    this._design.getList({}).then(
                        (res) => {
                            this.setState({
                                list: res.data.data.data
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

    render() {
        return (
            <div class="admin-content" style={{ paddingBottom: 80 }}>

                <Layout.Row gutter="20">
                    <Masonry>
                        {this.state.list.map((el) => {
                            return (
                                <Layout.Col span="4">
                                    <Card style={{ marginBottom: 10 }}>
                                        <img src={conf.staticUrl + el.thumb} style={{ maxWidth: '100%' }} />
                                        <div style={{ padding: 14 }}>
                                            <span class="text-nowrap">{el.title}</span>
                                            <div className="bottom clearfix">
                                            <Button type="text" className="button"><Link to={{pathname:`/admin/prdouct/${el.id}/editor`}}>编辑</Link></Button>
                                                <Button type="text" className="button" onClick={() => { this.handlDoDelete(el) }}>删除</Button>
                                            </div>
                                        </div>
                                    </Card>
                                </Layout.Col>
                            );
                        })}
                    </Masonry>
                </Layout.Row>

            </div>
        );
    }
}

