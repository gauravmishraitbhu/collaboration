import React from 'react';

import ReactDOM from 'react-dom';
import ChannelList from './../ChannelList.react.js'
import { connect } from 'react-redux'

//export default class ChannelListContainer extends React.Component{
//
//    constructor(){
//        super();
//    }
//
//    render(){
//        var stateObj = this.context.store.getState();
//
//        return (
//            <ChannelList channels={stateObj.channels}></ChannelList>
//        )
//    }
//}
//
//ChannelListContainer.contextTypes = {
//    store : React.PropTypes.object
//}


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