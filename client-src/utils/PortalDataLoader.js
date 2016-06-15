import Promise from 'bluebird'
import  * as request from 'superagent'

export function clientListAndProjectP(partnerId){

    console.log("here 3")
    var clientList = null;
    var promise1 = new Promise(function(resolve,reject){
        request.get('http://localhost:8000/api/client_list/'+partnerId)
        .end(function(err , res){
            if(err){
                reject(err);
            }else{
                clientList = res.body;
                resolve();
            }
        })
    })

    var projects = null;
    var promise2 = new Promise(function(resolve , reject){
        request.get('http://localhost:8000/api/project_list/'+partnerId)
        .end(function(err , res){
            if(err){
                reject(err);
            }else{
                projects = res.body;
                resolve();
            }
        })
    })

    var clientIdToProjectMap = {}
    var clientData = {};
    return Promise.all([promise1 , promise2])
    .then(function(){
        clientList.forEach(function(client){
            clientIdToProjectMap[client.id] = [];
            clientData[ client.name ] = client;
        })

        //add all the projects in their respective buckets
        projects.forEach(function(project){
            if(clientIdToProjectMap[project.client] == null){
                throw new Error("client id missing --"+project.client);
            }
            clientIdToProjectMap[project.client].push(project);
        })
        return {
            clientIdToProjectMap : clientIdToProjectMap,
            clientData : clientData
        }
    })

}