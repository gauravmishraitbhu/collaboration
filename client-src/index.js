import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux'
import mainReducer from './reducers'
import { Provider } from 'react-redux'
import  ChannelListContainer  from './components/leftsidebarcomponents/containers/ChannelListContainer.react.js'


let store = createStore(mainReducer , {
        channels : ['channel1' , ' channel2' , 'channel3' , 'channel4'],
        selectedChannel : 'channel1'
    },
    window.devToolsExtension && window.devToolsExtension()
);

ReactDOM.render(
    <Provider store={store}>
            <ChannelListContainer/>
    </Provider> ,
    document.getElementById('main_div'));