

export function getUnixTimestamp(pubnumTs){

    var unixTs = pubnumTs.toString().substring(0,10);
    return parseInt(unixTs);
}

export function getFormatedTime(unixTs){

    var date = new Date(unixTs*1000);
    //console.log(date);

    var hours = date.getHours();

    var minutes = "0" + date.getMinutes();


    var month = date.getMonth();
    var monthNames = ["Jan", "Feb", "March", "April", "May", "June",
        "July", "August", "September", "Oct", "Nov", "Dec"
    ];

    var date = date.getDate();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2)  + " " + monthNames[month] + " " + date;
    return formattedTime;
}

