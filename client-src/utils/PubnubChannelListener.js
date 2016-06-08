import {addNewMessage} from './../actions/AppAction'
import {transformPubnubMessage} from './MessageUtils'

export default class PubnubChannelListener {

    constructor(pubnubInstance , store,channelName){

        this.store = store;
        this.channelName = channelName;
        this.onMessage = this.onMessage.bind(this);
        pubnubInstance.subscribe({
            channel : channelName,
            include_token : true,
            message : this.onMessage
        })
    }

    onMessage(message , envelop){

        console.log(envelop[1]);
        let appMessage = transformPubnubMessage(message ,envelop[1] , this.channelName );
        this.store.dispatch(addNewMessage(this.channelName , appMessage));
    }
}