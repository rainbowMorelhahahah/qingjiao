import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu } from 'element-react';

export default class Left extends React.Component {
    constructor(props) {
        super(props);
    }

    onOpen() {

    }

    onClose() {

    }

    render() {
        return (
            <div class="left-aside">
                <div class="logo">
                </div>
                <ul class="menu">
                    <Menu defaultActive="2" className="el-menu-vertical-demo" onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)}>
                        <Menu.Item index="1">
                            <NavLink to="/admin/home">首页</NavLink>
                        </Menu.Item>
                        <Menu.SubMenu index="2" title="产品管理">
                            <Menu.Item index="2-1">
                                <NavLink to="/admin/prdouct">产品列表</NavLink>
                            </Menu.Item>
                            <Menu.Item index="2-2">
                                <NavLink to="/admin/prdouct/create">新增产品</NavLink>
                            </Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu index="4" title="喔图管理">
                            <Menu.Item index="4-1">
                                <NavLink to="/admin/lives">喔图列表</NavLink>
                            </Menu.Item>
                            <Menu.Item index="4-2">
                                <NavLink to="/admin/lives/create">添加新项</NavLink>
                            </Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu index="3" title="系统设置">
                            <Menu.Item index="3-1">
                                <NavLink to="/admin/permission">权限管理</NavLink>
                            </Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </ul>
            </div>
        );
    }
}