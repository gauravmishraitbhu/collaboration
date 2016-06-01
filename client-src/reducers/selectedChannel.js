import ActionTypes from './../constants/ActionTypes'

export function selectedChannel(channel,action){

    if(channel == null){
        return 'channel1'
    }

    switch (action.type){
        case ActionTypes.SELECT_CHANNEL:
        {
            return action.selectedChannel;
            break;
        }

        default : {
            return channel
        }
    }

}