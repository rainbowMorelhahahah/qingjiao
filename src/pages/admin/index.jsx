import React from 'react';
import { Card, Button } from 'element-react';

import UmEditor from 'components/umeditor/index.jsx';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: {
                content: 'Baidu'
            }
        };
    }
    //更换代码
    handleChange(content) {
        this.state.from.content = content;
    }

    render() {
        return (
            <div class="admin-content">
                <Card>
                    <UmEditor onChange={this.handleChange.bind(this)} initialContent={this.state.from.content} />
                </Card>
                <Card>
                    <Button type="success">保存</Button>
                    <Button>返回</Button>
                </Card>
            </div>
        );
    }
}

export default Index;
