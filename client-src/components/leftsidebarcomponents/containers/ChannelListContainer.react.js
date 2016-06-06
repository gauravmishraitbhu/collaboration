import React from 'react';

import ReactDOM from 'react-dom';
import ChannelList from './../ChannelList.react.js'
import { connect } from 'react-redux'
import {selectChannel} from './../../../actions/AppAction'


class ChannelListParent extends  React.Component{
    static propTypes={
        channels : React.PropTypes.array.isRequired,
        dispatch : React.PropTypes.func.isRequired
    }

    onChannelSelected = (selectedChannel)  => {
        this.props.dispatch(selectChannel(selectedChannel));
    }

    render() {
        return (
            <ChannelList channels={this.props.channels} onChannelSelected={this.onChannelSelected}/>
            )

    }
}


const mapStateToProps = (state) => {
    return {
        channels: state.channels
    }
}



const ChannelListContainer = connect(
    mapStateToProps,
    null
)(ChannelListParent)

export default ChannelListContainer