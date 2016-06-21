import * as request from 'superagent'
import Promise from 'bluebird'

//var request = require('superagent')
//var Promise = require('bluebird')

var requestAsync = Promise.promisifyAll(request);
var baseUrl = 'http://localhost:8000'


export function updateTaskStatusP(taskId , newStatus){

    //console.log(taskId);

    return Promise.try(function(){
        return requestAsync
        .post(baseUrl+'/api/task/status')
        .send({
            taskId : taskId,
            status : newStatus
        })
        .then(function(res){
            return res.body.success;
        })
    })
    .catch(function(err){
        console.log(err);
    })

}


