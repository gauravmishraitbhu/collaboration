
import { getUnixTimestamp } from './TimeUtils'

/*
 message = {
    type :
    text :
    senderUUID :

     //following are not expected to be part of pubnub messages
    time :
    channel :

 }
 */

export function transformPubnubMessage( pubnubMessage , pubnumTimestamp , channelName ){
    var message = Object.assign({} , pubnubMessage , {
        time : getUnixTimestamp(pubnumTimestamp),
        channel : channelName
    })

    if(message.senderUUID == null){
        message.senderUUID = -1;
    }

    //? to set default type

    return message;

}