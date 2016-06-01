import { combineReducers } from 'redux'
import  { selectedChannel }  from './selectedChannel'
import { channels } from './channelList'

const mainReducer = combineReducers({
    selectedChannel,
    channels
})

export default mainReducer