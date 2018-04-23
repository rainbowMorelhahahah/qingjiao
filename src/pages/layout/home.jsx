import React from 'react';

class Home extends React.Component {
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
                {this.props.children}
            </div>
        );
    }
}

export default Home;
