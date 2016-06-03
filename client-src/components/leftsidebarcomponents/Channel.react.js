import React from 'react';

import ReactDOM from 'react-dom';

export default class Channel extends React.Component{

    static propTypes = {
        name : React.PropTypes.string.isRequired
    }

    render(){


        return (
            <div className="channel_name" style={{fontSize:'20px'}}>
                {this.props.name}
            </div>
        )
    }
}
