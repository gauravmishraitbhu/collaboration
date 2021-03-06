import React from 'react';

import ReactDOM from 'react-dom';
import ChannelList from './../ChannelList.react.js'
import { connect } from 'react-redux'
import {selectChannel} from './../../../actions/AppAction'


class ChannelListParent extends  React.Component{
    static propTypes={
        channels : React.PropTypes.array.isRequired,
        dispatch : React.PropTypes.func.isRequired,
        selectedChannel : React.PropTypes.string.isRequired,
        unreadCountData : React.PropTypes.object.isRequired
    }

    onChannelSelected = (selectedChannel)  => {
        this.props.dispatch(selectChannel(selectedChannel));
    }

    render() {

        const {selectedChannel , channels ,unreadCountData } = this.props;
        return (
            <ChannelList selectedChannel={selectedChannel}
                         channels={channels}
                         unreadCountData = {unreadCountData}
                         onChannelSelected={this.onChannelSelected}/>
            )

    }
}

function getUnreadCounts(state){
    var channels = Object.keys(state.dataByChannelId);

    var unreadCounterById = {};
    channels.forEach(function(channel){
        var channelData = state.dataByChannelId[channel];
        var messages = [...channelData["chats"] , ...channelData["notifications"] ] ;
        var lastReadTs = channelData.lastViewTs;

        let counter = 0;
        messages.forEach(function(message){
            if(message.time > lastReadTs){
                counter++;
            }
        })
        unreadCounterById[channel] = counter;
    })

    return unreadCounterById;
}

const mapStateToProps = (state) => {
    return {
        channels: Object.keys(state.dataByChannelId),
        selectedChannel : state.selectedChannel,
        unreadCountData : getUnreadCounts(state)
    }
}



const ChannelListContainer = connect(
    mapStateToProps,
    null
)(ChannelListParent)

export default ChannelListContainer