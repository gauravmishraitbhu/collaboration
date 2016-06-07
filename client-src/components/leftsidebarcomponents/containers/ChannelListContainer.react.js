import React from 'react';

import ReactDOM from 'react-dom';
import ChannelList from './../ChannelList.react.js'
import { connect } from 'react-redux'
import {selectChannel} from './../../../actions/AppAction'


class ChannelListParent extends  React.Component{
    static propTypes={
        channels : React.PropTypes.array.isRequired,
        dispatch : React.PropTypes.func.isRequired,
        selectedChannel : React.PropTypes.string.isRequired
    }

    onChannelSelected = (selectedChannel)  => {
        this.props.dispatch(selectChannel(selectedChannel));
    }

    render() {

        const {selectedChannel , channels} = this.props;
        return (
            <ChannelList selectedChannel={selectedChannel} channels={channels} onChannelSelected={this.onChannelSelected}/>
            )

    }
}


const mapStateToProps = (state) => {
    return {
        channels: state.channels,
        selectedChannel : state.selectedChannel
    }
}



const ChannelListContainer = connect(
    mapStateToProps,
    null
)(ChannelListParent)

export default ChannelListContainer