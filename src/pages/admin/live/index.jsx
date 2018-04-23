import React from 'react';

import { Button, Table, Card, Pagination } from 'element-react';
import { Link } from 'react-router-dom';

import LiveServer from 'servers/live.jsx';



export default class Live extends React.Component {
    _live = null;

    constructor(porps) {
        super(porps);

        this._live  = new LiveServer();

        this.state = {
            columns: [
                {
                    label: "编号",
                    prop: "id",
                },
                {
                    label: "缩略图",
                    prop: "thumb",
                    render: function (data) {
                        return (
                            <img src={data.thumb} width="80" height="80" />
                        );
                    }
                },
                {
                    label: "标题",
                    prop: "title",
                },
                {
                    label: "链接",
                    prop: "src",
                    render: function (data) {
                        return (
                            <a href={data.src}>{data.src}</a>
                        );
                    }
                },
                {
                    label: "描述",
                    prop: "desc",
                },
                {
                    label: "状态",
                    prop: "status",
                    width: 120,
                    render: function (data) {
                        return (
                            <span>{data.status == 0 ? '草稿' : '发布'}</span>
                        );
                    }
                },
                {
                    label: "操作",
                    fixed: 'right',
                    width: 120,
                    render: (data) => {
                        return (
                            <span>
                <Button type="text" size="small">
                  <Link to={`/admin/lives/${data.id}/editor`}>编辑</Link>
                </Button>
                <Button type="text" size="small">删除</Button>
              </span>
                        )
                    }
                }
            ],
            data: []
        }

        this._live.getList().then(
            (res) => {
                let _data = res.data;
                this.setState({
                    data: _data.data
                });
            }
        );

    }

    render() {
        return (
            <div class="admin-content">
              <Card className="box-card"
                    header={
                      <div className="clearfix">
              <span style={{ "lineHeight": "36px" }}>
                直播列表
                                </span>
                        <span style={{ "float": "right" }}>
                <Link to="/admin/lives/create">
                  <Button type="primary" icon="plus">
                    新增
                  </Button>
                </Link>
              </span>
                      </div>
                    }>

                <Table
                    style={{ width: '100%' }}
                    columns={this.state.columns}
                    data={this.state.data}
                    border={true}
                />
                <div class="card-pagination">
                  <Pagination className="mt-20" layout="prev, pager, next" total={1000} />
                </div>
              </Card>

            </div>
        )
    }
}