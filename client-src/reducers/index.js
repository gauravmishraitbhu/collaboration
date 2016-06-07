import { combineReducers } from 'redux'
import  { selectedChannel }  from './selectedChannel'
import { channels } from './channelList'
import ActionTypes from './../constants/ActionTypes'


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
        default : {
            return data
        }
    }
}

const mainReducer = combineReducers({
    selectedChannel,
    channels,
    selectedCategory,
    dataByChannelId
})

export default mainReducer