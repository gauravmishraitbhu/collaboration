import React from 'react';

import ReactDOM from 'react-dom';
import ChannelListContainer from './leftsidebarcomponents/containers/ChannelListContainer.react'
import MessageListContainer from './messagelistcomponents/MessageListContainer.react'
import ServiceListContainer from './serviceuicomponents/ServiceUIContainer.react'

export default class App extends React.Component{


    render(){


        return (
            <div>
                <div id="header"></div>
                <ChannelListContainer/>
                <MessageListContainer/>
                <ServiceListContainer/>
            </div>
        )
    }
}
