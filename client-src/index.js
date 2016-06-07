import React from 'react';
import ReactDOM from 'react-dom';

import { createStore,applyMiddleware ,compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import mainReducer from './reducers'
import { Provider } from 'react-redux'
import App from './components/App'
import PubnumChannelListener from './utils/PubnubChannelListener'

var initialData = {
    channels : ['channel1' , 'channel2' , 'channel3' , 'channel4'],
    selectedChannel : 'channel1',
    selectedCategory : 'chats',
    dataByChannelId : {
        channel1 : {
            chats : [
                {
                    text : "Service Foo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod biben Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod biben."
                },
                {
                    text : "Service Foo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod biben Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod biben."
                },
                {
                    text : "Service Foo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod biben Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod biben."
                }
            ],
            notifications : [
                {
                    text : "Notification 1"
                },
                {
                    text : "Notification 2"
                },
                {
                    text : "Notification 3"
                }
            ]
        },
        channel2 : {
            chats : [
                {
                    text : "Message 1"
                },
                {
                    text : "Message 2"
                },
                {
                    text : "Message 3"
                },
                {
                    text : "Message 4"
                }
            ],
            notifications : [
                {
                    text : "Notification 1"
                },
                {
                    text : "Notification 2"
                },
                {
                    text : "Notification 3"
                }
            ]
        },
        channel3 : {
            chats : [
                {
                    text : "Message 1"
                },
                {
                    text : "Message 2"
                },
                {
                    text : "Message 3"
                }
            ],
            notifications : [
                {
                    text : "Notification 1"
                }
            ]
        },
        channel4 : {
            chats : [
                {
                    text : "Message 1"
                }
            ],
            notifications : [
                {
                    text : "Notification 1"
                },
                {
                    text : "Notification 2"
                },
                {
                    text : "Notification 3"
                }
            ]
        }
    }
}

const loggerMiddleware = createLogger()

let store = createStore(mainReducer ,
    initialData,
    compose(
        applyMiddleware(thunkMiddleware , loggerMiddleware),

        window.devToolsExtension && window.devToolsExtension()
    )

);

var pubnumInstance = PUBNUB.init({
    publish_key: 'pub-c-02b19d92-f815-4e44-92ea-af67f4e7e1e8',
    subscribe_key: 'sub-c-27fcec44-2cb4-11e6-9327-02ee2ddab7fe'
});

new PubnumChannelListener(pubnumInstance ,store , "channel1" );

ReactDOM.render(
    <Provider store={store}>
            <App/>
    </Provider> ,
    document.getElementById('main_div'));