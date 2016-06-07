import {addNewMessage} from './../actions/AppAction'

export default class PubnubChannelListener {

    constructor(pubnubInstance , store,channelName){

        this.store = store;
        this.channelName = channelName;
        this.onMessage = this.onMessage.bind(this);
        pubnubInstance.subscribe({
            channel : channelName,
            message : this.onMessage
        })
    }

    onMessage(message){
        console.log("recieved a message in chanel="+this.channelName)
        console.log(message);
        this.store.dispatch(addNewMessage(this.channelName , message));
    }
}