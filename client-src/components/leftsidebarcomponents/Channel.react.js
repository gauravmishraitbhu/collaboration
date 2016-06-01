import React from 'react';

import ReactDOM from 'react-dom';

export default class Channel extends React.Component{

    static propTypes = {
        name : React.PropTypes.string.isRequired
    }

    render(){


        return (
            <li style={{fontSize:'25px'}}>
                {this.props.name}
            </li>
        )
    }
}
