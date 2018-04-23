import React from 'react';
import { hot } from 'react-hot-loader';

import Header from 'components/admin/common/header.jsx';
import Left from 'components/admin/common/left.jsx';
import Footer from 'components/admin/common/footer.jsx';

import 'element-theme-default';

import './index.scss';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hello: 'Layout Component'
        };
    }
    componentDidMount() {

    }
    render() {
        return (
            <div>
                <Header />
                <Left />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

export default hot(module)(Index);
