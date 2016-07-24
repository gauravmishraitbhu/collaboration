var pubnub = require('pubnub')

var pubnubIns = pubnub.init({
    publish_key: 'pub-c-02b19d92-f815-4e44-92ea-af67f4e7e1e8',
    subscribe_key: 'sub-c-27fcec44-2cb4-11e6-9327-02ee2ddab7fe'
})


var channelName = "channel1"
var message = {
    type : "chats",
    text : "this is a new chat"
}

pubnubIns.publish({
    channel : channelName,
    message : message
})

