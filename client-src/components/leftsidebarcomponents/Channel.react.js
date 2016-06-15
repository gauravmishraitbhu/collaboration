import React from 'react';

import ReactDOM from 'react-dom';
import classNames from 'classnames'

export default class Channel extends React.Component{

    static propTypes = {
        name : React.PropTypes.string.isRequired,
        onChannelSelected : React.PropTypes.func.isRequired,
        isSelected : React.PropTypes.bool.isRequired,
        unreadCount : React.PropTypes.number.isRequired
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

        const {unreadCount , name } = this.props;
        if(unreadCount > 0){
            var undreadCountNode = (
                <div className="channel-unread-counter">
                    {this.props.unreadCount}
                </div>
            );
        }else{
            var undreadCountNode = null;
        }


        return (
            <div className="channel-tile-container">
                <div className={channelNameClass} onClick={this.handleClick}>
                    {this.props.name}
                </div>
                {undreadCountNode}
            </div>
        )
    }
}
