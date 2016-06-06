import React from 'react';

import ReactDOM from 'react-dom';
import Channel from './Channel.react'

export default class ChannelList extends React.Component{

    static propTypes = {
        channels : React.PropTypes.array.isRequired,
        onChannelSelected : React.PropTypes.func.isRequired
    }

    render(){

        var that = this;
        var channelList = this.props.channels.map(function(channel){
            return (<Channel key={channel} name={channel} onChannelSelected={that.props.onChannelSelected} />)
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
