import { combineReducers } from 'redux'
import  { selectedChannel }  from './selectedChannel'
import { channels } from './channelList'

function selectedCategory(selectedCategory='chats' , action){
    return selectedCategory;
}

function dataByChannelId(data={} , action){
    return data;
}

const mainReducer = combineReducers({
    selectedChannel,
    channels,
    selectedCategory,
    dataByChannelId
})

export default mainReducer