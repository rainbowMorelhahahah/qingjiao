import React from 'react';
import { Card } from 'element-react';
import { Link } from 'react-router-dom';

import fwimages from 'images/404.fw.png';

class Error extends React.Component {
    render() {
        return (
            <div class="admin-content">
                <Card style={styles.card}>
                    <img src={fwimages} style={styles.images} />
                    <p style={styles.colors}>
                        <span>很抱歉，此页面可能已被删除或者你没有访问权限！</span>
                        <span>您可以<Link to="/admin/home" style={styles.acolors}>返回首页</Link></span>
                    </p>
                </Card>
            </div>
        );
    }
}

const styles = {
    images: {
        maxWidth: "650px"
    },
    card: {
        textAlign: "center"
    },
    colors: {
        color: "#99A9BF"
    },
    acolors: {
        color: "#20A0FF"
    }
};

export default Error;