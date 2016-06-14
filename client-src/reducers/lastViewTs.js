import ActionTypes from './../constants/ActionTypes'

export function lastViewTsById(state={} , action){
    switch (action.type){
        case ActionTypes.SELECT_CHANNEL:
        {
            let channel = action.selectedChannel;
            let chatData = state.dataByChannelId[channel];

            //concat the arrays of messages
            let messages = [...chatData["chats"] , ...chatData["notifications"]]
            let highestTs = -1;
            messages.forEach(function(message){
                if(message.time > highestTs){
                    highestTs = message.time;
                }
            })

            var oldViewTsData = state.lastViewTsById;
            var newViewTsData = Object.assign({} , oldViewTsData , {
                [channel] : highestTs
            })

            var newState = Object.assign({} , state , {
                lastViewTsById : newViewTsData
            })

            return newViewTsData

        }
        default:
        {
            return state.lastViewTsById;
        }
    }
}
