import React from 'react';

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div class="admin-footer">
                <div style={styles.footer}>
                    京公网安备11010802014104号 / Powered by  2008-2018 UI.CN
                </div>
            </div>
        );
    }
}

const styles = {
    footer: {
        backgroundColor: '#fff',
        padding: "20px",
        fontSize: "12px",
        color: "#7f8c8d"
    }
};