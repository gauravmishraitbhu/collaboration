import React from 'react';

import ReactDOM from 'react-dom';

export default class Channel extends React.Component{

    static propTypes = {
        name : React.PropTypes.string.isRequired,
        onChannelSelected : React.PropTypes.func.isRequired
    }


    handleClick = (e) => {
        const {onChannelSelected , name} = this.props;
        onChannelSelected(name);
    }

    render(){

        return (
            <div className="channel_name" style={{fontSize:'20px'}} onClick={this.handleClick}>
                {this.props.name}
            </div>
        )
    }
}
