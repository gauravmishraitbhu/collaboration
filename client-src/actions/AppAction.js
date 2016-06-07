import ActionTypes from './../constants/ActionTypes'
import {sendMessage as sendMsgToPubnub} from './../utils/PubnubMessagePublisher'

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


export function sendMessage(channel , message){
    sendMsgToPubnub(channel , message);
}

export function selectCategory(newCategory){
    return {
        type : ActionTypes.SELECT_CATEGORY,
        category : newCategory
    }
}