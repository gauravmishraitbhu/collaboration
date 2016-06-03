import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux'
import mainReducer from './reducers'
import { Provider } from 'react-redux'
import App from './components/App'


let store = createStore(mainReducer , {
        channels : ['channel1' , ' channel2' , 'channel3' , 'channel4'],
        selectedChannel : 'channel1'
    },
    window.devToolsExtension && window.devToolsExtension()
);

ReactDOM.render(
    <Provider store={store}>
            <App/>
    </Provider> ,
    document.getElementById('main_div'));