
import {bootstrapFromHistory} from './../actions/AppAction'
import {transformPubnubMessage} from './MessageUtils'

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

        var that = this;
        var messages = data[0].map(function(data){
            return transformPubnubMessage ( data.message , data.timetoken , that.channelName) ;
        })
        this.store.dispatch( bootstrapFromHistory( this.channelName , messages ));
    }

}