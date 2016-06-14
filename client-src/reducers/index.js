import { combineReducers } from 'redux'
import  { selectedChannel }  from './selectedChannel'
import { channels } from './channelList'
import ActionTypes from './../constants/ActionTypes'
import {lastViewTsById as computeLastViewTs} from './lastViewTs'


function selectedCategory(selectedCategory='chats' , action){
    switch (action.type){
        case ActionTypes.SELECT_CATEGORY:
        {
            return action.category;
        }
        default:
        {
            return selectedCategory;
        }
    }
}

function addMessage(messagesByCategory = {} , action){
    var messageType = action.message.type;
    console.log(messageType);
    console.log(messagesByCategory)
    var newMessageData = Object.assign({} , messagesByCategory , {
        [messageType] : [...messagesByCategory[messageType] , action.message ]
    })
    return newMessageData;
}

function dataByChannelId(data={} , action){
    switch (action.type){
        case ActionTypes.ADD_NEW_MESSAGE:
        {
            var channel = action.channel;
            var category = action.type;

            var newData = Object.assign({} , data , {
                [channel] : addMessage(data[channel] , action)
            })
            return newData;
        }
        case ActionTypes.BOOTSTRAP_HISTORY:
        {
            var newData = Object.assign({} , data , {
                [action.channel] : {
                    chats : action.chats,
                    notifications : action.notifications
                }
            })
            return newData;
        }
        default : {
            return data
        }
    }
}


const mainReducer3 = function(state , action){
    console.log(state);
    const {lastViewTsById , ...rest} = state

    console.log(rest);
    var newState = Object.assign({} , state ,
        combineReducers({
            selectedChannel,
            channels,
            selectedCategory,
            dataByChannelId
        })(rest , action)
    )

    newState.lastViewTsById = computeLastViewTs(newState,action);
    return newState;
}

//const mainReducer2 = function(state , action){
//    return {
//        selectedChannel : selectedChannel(state.selectedChannel,action),
//        channels : channels(state.channels,action),
//        selectedCategory : selectedCategory(state.selectedCategory,action),
//        dataByChannelId : dataByChannelId(state.dataByChannelId,action),
//        lastViewTsById : lastViewTsById(state,action)
//    }
//}

//const mainReducer = combineReducers({
//    selectedChannel,
//    channels,
//    selectedCategory,
//    dataByChannelId,
//    lastViewTsById
//})

export default mainReducer3