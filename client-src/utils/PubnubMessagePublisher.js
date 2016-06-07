

let pubnubInstance = null;

export function initialize(pubnubIns){
    pubnubInstance = pubnubIns;
}

export function sendMessage(channel , data){
    pubnubInstance.publish({
        channel : channel,
        message : data
    })
}