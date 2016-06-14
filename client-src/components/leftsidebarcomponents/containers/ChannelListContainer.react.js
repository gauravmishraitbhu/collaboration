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
    var channels = state.channels;

    var unreadCounterById = {};
    channels.forEach(function(channel){
        var messageData = state.dataByChannelId[channel];
        var messages = [...messageData["chats"] , ...messageData["notifications"] ] ;
        var lastReadTs = state.lastViewTsById[channel];

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
        channels: state.channels,
        selectedChannel : state.selectedChannel,
        unreadCountData : getUnreadCounts(state)
    }
}



const ChannelListContainer = connect(
    mapStateToProps,
    null
)(ChannelListParent)

export default ChannelListContainer