import React from 'react';

import ReactDOM from 'react-dom';
import classNames from 'classnames'

export default class Channel extends React.Component{

    static propTypes = {
        name : React.PropTypes.string.isRequired,
        onChannelSelected : React.PropTypes.func.isRequired,
        isSelected : React.PropTypes.bool.isRequired
    }


    handleClick = (e) => {
        const {onChannelSelected , name} = this.props;
        onChannelSelected(name);
    }

    render(){

        var channelNameClass = classNames({
            "channel_name" : true,
            "selected" : this.props.isSelected
        })
        return (
            <div className={channelNameClass} style={{fontSize:'20px'}} onClick={this.handleClick}>
                {this.props.name}
            </div>
        )
    }
}
