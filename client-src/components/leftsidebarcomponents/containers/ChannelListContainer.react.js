import React from 'react';

import ReactDOM from 'react-dom';
import ChannelList from './../ChannelList.react.js'
import { connect } from 'react-redux'


const mapStateToProps = (state) => {
    return {
        channels: state.channels
    }
}


const ChannelListContainer = connect(
    mapStateToProps,
    null
)(ChannelList)

export default ChannelListContainer