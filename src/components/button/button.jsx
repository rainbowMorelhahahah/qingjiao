import React from 'react';

import classnames from 'classnames';

export default class Button extends React.Component {
    constructor(porps) {
        super(porps);
    }

    render() {
        const { type, className } = this.props;

        const classes = classnames(className, {
            [`btn-${type}`]: type
        }, 'btn');
        console.log(classes);
        return (
            <button className={classes}>
                {this.props.children}
            </button>
        )
    }
}