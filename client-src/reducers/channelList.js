export function channels(channels,action){

    if(channels == null){
        return ['channel1 , channel2' , 'channel3']
    }

    switch (action.type){
        default : {
            return channels
        }
    }

}