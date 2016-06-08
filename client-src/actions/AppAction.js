import ActionTypes from './../constants/ActionTypes'
import {sendMessage as sendMsgToPubnub} from './../utils/PubnubMessagePublisher'
import {getCurrentUser} from './../utils/AppManager'

export function selectChannel(channel){
    return {
        type : ActionTypes.SELECT_CHANNEL,
        selectedChannel : channel
    }
}

export function addNewMessage(channel , message){
    return {
        type : ActionTypes.ADD_NEW_MESSAGE,
        channel  : channel,
        message : message
    }
}

export function bootstrapFromHistory(channel , messages){


    var chats = messages.filter(function(message){

        if(message.type == null){
            console.warn("got a message without type set")
        }
        return message.type == "chats"
    })

    var notifications = messages.filter(function(message){
        return message.type == "notifications"
    })

    return{
        type : ActionTypes.BOOTSTRAP_HISTORY,
        channel: channel,
        chats : chats,
        notifications : notifications
    }
}


export function sendMessage(channel , message){
    var currentUserId = getCurrentUser().uuid;
    var data = {
        type : "chats",
        text : message,
        senderUUID : currentUserId
    }
    sendMsgToPubnub(channel , data);
}

export function selectCategory(newCategory){
    return {
        type : ActionTypes.SELECT_CATEGORY,
        category : newCategory
    }
}