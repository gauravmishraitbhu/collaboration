import React from 'react';

import ReactDOM from 'react-dom';
import ChannelList from './ChannelList.react'

export default class ChannelListContainer extends React.Component{

    constructor(){
        super();
    }

    render(){
        var stateObj = this.props.store.getState();

        return (
            <ChannelList channels={stateObj.channels}></ChannelList>
        )
    }
}

//ChannelListContainer.contextTypes = {
//    store : React.PropTypes.object
//}

//export default ChannelListContainer;