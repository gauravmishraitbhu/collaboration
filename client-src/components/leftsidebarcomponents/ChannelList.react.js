import React from 'react';

import ReactDOM from 'react-dom';
import Channel from './Channel.react'

export default class ChannelList extends React.Component{

    static propTypes = {
        channels : React.PropTypes.array.isRequired
    }

    render(){

        var channelList = this.props.channels.map(function(channel){
            return (<Channel key={channel} name={channel}/>)
        })

        return (
            <ul>
                {channelList}
            </ul>
        )
    }
}
