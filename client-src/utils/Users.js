
let users = {
    "-1" : {
        name : "Default",
        uuid : "-1"
    },

    "1" : {
        name : "Gaurav",
        uuid : "1"
    },
    "2" : {
        name : "Amit",
        uuid : "2"
    },
    "3" : {
        name : "Rahul",
        uuid : "3"
    },
    "4" : {
        name : "Vipul",
        uuid : "4"
    },
    "5" : {
        name : "Ravi",
        uuid : "5"
    }

}

export function getUserNameFromUUID(uuid){
    var user = users[uuid];

    return user["name"];
}

export function getRandomUser(){
    let random = Math.floor (Math.random() * 4 )
    let userId = random + 1;
    return users[userId.toString()];
}