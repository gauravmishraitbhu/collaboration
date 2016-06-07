import React from 'react';

import ReactDOM from 'react-dom';
import Channel from './Channel.react'

export default class ChannelList extends React.Component{

    static propTypes = {
        channels : React.PropTypes.array.isRequired,
        onChannelSelected : React.PropTypes.func.isRequired,
        selectedChannel : React.PropTypes.string.isRequired
    }

    render(){

        var that = this;
        var channelList = this.props.channels.map(function(channel){

            const { onChannelSelected , selectedChannel } = that.props;

            let isSelected = (channel == selectedChannel)
            return (<Channel isSelected={isSelected} key={channel}
                             name={channel}
                             onChannelSelected={onChannelSelected} />)
        })

        return (
            <div className="channel_list_container">
                <div className="channel_list">
                    {channelList}
                </div>
            </div>
        )
    }
}
