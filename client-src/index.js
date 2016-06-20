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
import {clientListAndProjectP} from './utils/PortalDataLoader'

//var initialData = {
//    channels : ['channel1' , 'channel2' , 'channel3' , 'channel4'],
//    selectedChannel : 'channel1',
//    selectedCategory : 'chats',
//    lastViewTsById : {
//        channel1 : 0,
//        channel2 : 0,
//        channel3 : 0,
//        channel4 : 0
//    },
//    dataByChannelId : {
//        channel1 : {
//            chats : [
//                //{
//                //    text : "Service Foo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod biben Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod biben."
//                //},
//                //{
//                //    text : "Service Foo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod biben Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod biben."
//                //},
//                //{
//                //    text : "Service Foo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod biben Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod biben."
//                //},
//                //{
//                //    text : "Service Foo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod biben Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod biben."
//                //},
//                //{
//                //    text : "Service Foo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod biben Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod biben."
//                //}
//            ],
//            notifications : [
//                {
//                    text : "Notification 1"
//                },
//                {
//                    text : "Notification 2"
//                },
//                {
//                    text : "Notification 3"
//                }
//            ]
//        },
//        channel2 : {
//            chats : [
//
//            ],
//            notifications : [
//                {
//                    text : "Notification 1"
//                },
//                {
//                    text : "Notification 2"
//                },
//                {
//                    text : "Notification 3"
//                }
//            ]
//        },
//        channel3 : {
//            chats : [
//
//            ],
//            notifications : [
//                {
//                    text : "Notification 1"
//                }
//            ]
//        },
//        channel4 : {
//            chats : [
//
//            ],
//            notifications : [
//                {
//                    text : "Notification 1"
//                },
//                {
//                    text : "Notification 2"
//                },
//                {
//                    text : "Notification 3"
//                }
//            ]
//        }
//    }
//}

function prepareSingleChannelData(clientInstance , projectData){
    return {
        id : clientInstance.id,
        lastViewTs : 0,
        chats : [],
        notifications : [],
        projects : projectData
    }
}


function generateInitialData(clientData , clientToProjectMapping){
    var initialData = {
        selectedChannel : Object.keys(clientData)[0],
        selectedCategory : 'chats',
        dataByChannelId : {

        }
    };

    var dataByChannelId = {};
    Object.keys(clientData).forEach(function(clientName){
        var clientInstance = clientData[clientName];
        var projectData = clientToProjectMapping[clientInstance.id];

        dataByChannelId[clientName] = prepareSingleChannelData(clientInstance , projectData);
    })

    initialData.dataByChannelId = dataByChannelId;

    return initialData;
}

console.log("i m here")

clientListAndProjectP(24)
.then(function(data){

    console.log("got data from backend")
    // client name to client instance
    var clientData = data.clientData;

    //mapping clientId to project
    var clientToProjectMapping = data.clientIdToProjectMap;
    var channelList = Object.keys(clientData);

    const loggerMiddleware = createLogger()

    var initialData = generateInitialData(clientData ,clientToProjectMapping );

    let store = createStore(mainReducer ,
        initialData,
        compose(
            applyMiddleware(thunkMiddleware),

            window.devToolsExtension && window.devToolsExtension()
        )

    );

    setCurrentUser(getRandomUser());


    var pubnubInstance = PUBNUB.init({
        publish_key: 'pub-c-70c56c16-2d37-47df-9642-90a2e22ce164',
        subscribe_key: 'sub-c-95dd1afa-2cea-11e6-9f24-02ee2ddab7fe'
    });

    channelList.forEach(function(channel){
        new PubnumChannelListener(pubnubInstance ,store , channel );
    })

    channelList.forEach(function(channel){
        new PubnubHistoryLoader(pubnubInstance , store , channel)
    })

    initMessagePublisher(pubnubInstance);

    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider> ,
        document.getElementById('main_div'));

})











