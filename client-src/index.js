import React from 'react';
import ReactDOM from 'react-dom';

import { createStore,applyMiddleware ,compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import mainReducer from './reducers'
import { Provider } from 'react-redux'
import App from './components/App'
import PubnumChannelListener from './utils/PubnubChannelListener'
import {initialize as initMessagePublisher} from './utils/PubnubMessagePublisher'
import PubnubHistoryLoader from './utils/PubnubHistoryLoader'
import { getRandomUser } from './utils/Users'
import { setCurrentUser } from './utils/AppManager'

var initialData = {
    channels : ['channel1' , 'channel2' , 'channel3' , 'channel4'],
    selectedChannel : 'channel1',
    selectedCategory : 'chats',
    dataByChannelId : {
        channel1 : {
            chats : [
                //{
                //    text : "Service Foo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod biben Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod biben."
                //},
                //{
                //    text : "Service Foo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod biben Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod biben."
                //},
                //{
                //    text : "Service Foo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod biben Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod biben."
                //},
                //{
                //    text : "Service Foo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod biben Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod biben."
                //},
                //{
                //    text : "Service Foo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod biben Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod biben."
                //}
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

            ],
            notifications : [
                {
                    text : "Notification 1"
                }
            ]
        },
        channel4 : {
            chats : [

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

setCurrentUser(getRandomUser());

var pubnubInstance = PUBNUB.init({
    publish_key: 'pub-c-70c56c16-2d37-47df-9642-90a2e22ce164',
    subscribe_key: 'sub-c-95dd1afa-2cea-11e6-9f24-02ee2ddab7fe'
});

var channeList = ["channel1" , "channel2" , "channel3" , "channel4"];

channeList.forEach(function(channel){
    new PubnumChannelListener(pubnubInstance ,store , channel );
})

channeList.forEach(function(channel){
    new PubnubHistoryLoader(pubnubInstance , store , channel)
})



initMessagePublisher(pubnubInstance);

ReactDOM.render(
    <Provider store={store}>
            <App/>
    </Provider> ,
    document.getElementById('main_div'));