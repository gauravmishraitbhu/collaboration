import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux'
import mainReducer from './reducers'
import { Provider }  from './components/Provider'
import  ChannelListContainer  from './components/leftsidebarcomponents/ChannelListContainer.react'


let store = createStore(mainReducer , {
        channels : ['channel1' , ' channel2' , 'channel3' , 'channel4'],
        selectedChannel : 'channel1'
    },
    window.devToolsExtension && window.devToolsExtension()
);

ReactDOM.render(
    <ChannelListContainer store={store} /> ,
    document.getElementById('main_div'));