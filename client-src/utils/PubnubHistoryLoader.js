
import {bootstrapFromHistory} from './../actions/AppAction'

export default class PubnubHistoryLoader {
    constructor(pubnubInst , store , channelName ){
        this.pubnubInstance = pubnubInst;
        this.store = store;
        this.channelName = channelName;

        this.messagesLoaded = this.messagesLoaded.bind(this);
        pubnubInst.history({
            channel : channelName,
            include_token : true,
            count : 100,
            callback : this.messagesLoaded
        })

    }

    messagesLoaded(data){
        //console.log(data[0]);

        this.store.dispatch( bootstrapFromHistory( this.channelName , data[0] ));
    }

}