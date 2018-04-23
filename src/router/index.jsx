import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import AdminLayout from 'pages/layout/index.jsx';
import Login from 'pages/login/index.jsx';
import Register from 'pages/register/index.jsx';
import HomeLayout from 'pages/layout/home.jsx';

import AdminIndex from 'pages/admin/index.jsx';
import AdminLive from 'pages/admin/live/index.jsx';
import AdminLiveCreater from 'pages/admin/live/create.jsx';
import AdminLiveUpdate from 'pages/admin/live/update.jsx';
import AdminErrorPage from 'pages/admin/error.jsx';
import AdminPermission from 'pages/admin/permission/index.jsx';
import AdminPrdouctIndex from 'pages/admin/prdouct/index.jsx';
import AdminPrdouctCreate from 'pages/admin/prdouct/create.jsx';
import AdminPrdouctEdtior from 'pages/admin/prdouct/edtior.jsx';

import HomeIndex from 'pages/home/index.jsx';

class WebRouter extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/" render={() => (
                        <AdminLayout>
                            <Switch>
                                <Route exact path="/" component={AdminIndex} />
                                {/* 产品管理 */}
                                <Route exact path="/admin/prdouct" component={AdminPrdouctIndex} />
                                <Route exact path="/admin/prdouct/create" component={AdminPrdouctCreate} />
                                <Route exact path="/admin/prdouct/:id/editor" component={AdminPrdouctEdtior} />
                                {/* 权限 */}
                                <Route exact path="/admin/permission" component={AdminPermission} />
                                {/* 喔图管理 */}
                                <Route exact path="/admin/lives" component={AdminLive} />
                                <Route exact path="/admin/lives/create" component={AdminLiveCreater} />
                                <Route exact path="/admin/lives/:id/editor" component={AdminLiveUpdate} />
                                <Route exact component={AdminErrorPage} />
                            </Switch>
                        </AdminLayout>
                    )} />

                </Switch>
            </Router>
        );
    }
}

export default WebRouter;