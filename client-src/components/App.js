import React from 'react';

import ReactDOM from 'react-dom';
import ChannelListContainer from './leftsidebarcomponents/containers/ChannelListContainer.react'

export default class App extends React.Component{


    render(){


        return (
            <div>
                <div id="header"></div>
                <ChannelListContainer/>
            </div>
        )
    }
}
