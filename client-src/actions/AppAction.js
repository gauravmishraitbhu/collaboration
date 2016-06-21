import ActionTypes from './../constants/ActionTypes'
import {sendMessage as sendMsgToPubnub} from './../utils/PubnubMessagePublisher'
import {getCurrentUser} from './../utils/AppManager'
import {updateTaskStatusP} from './../utils/PortalApis'
import {generateTaskStatusChange} from './../utils/NotificationHelper'

export function selectChannel(channel){
    return {
        type : ActionTypes.SELECT_CHANNEL,
        selectedChannel : channel
    }
}

export function addNewMessage(channel , message){
    return {
        type : ActionTypes.ADD_NEW_MESSAGE,
        channel  : channel,
        message : message
    }
}

export function bootstrapFromHistory(channel , messages){


    var chats = messages.filter(function(message){

        if(message.type == null){
            console.warn("got a message without type set")
        }
        return message.type == "chats"
    })

    var notifications = messages.filter(function(message){
        return message.type == "notifications"
    })

    return{
        type : ActionTypes.BOOTSTRAP_HISTORY,
        channel: channel,
        chats : chats,
        notifications : notifications
    }
}


export function sendMessage(channel , message){
    var currentUserId = getCurrentUser().uuid;
    var data = {
        type : "chats",
        text : message,
        senderUUID : currentUserId
    }
    sendMsgToPubnub(channel , data);
}

export function selectCategory(newCategory){
    return {
        type : ActionTypes.SELECT_CATEGORY,
        category : newCategory
    }
}

export function changeTaskStatus(projectId , taskId , newStatus){
    return function(dispatch , getState){
        var state = getState();
        var selectedChannel = state.selectedChannel;
        var channelData = state.dataByChannelId[selectedChannel];
        var projectList = channelData.projects;

        var updatedTask = null;
        var projectName = null;
        var taskName = null;
        projectList.forEach(function(project){
            if(project.stages){
                project.stages.forEach(function(stage){

                    if(stage.tasks){
                        stage.tasks.forEach(function(task){
                            if(task.id == taskId){
                                updatedTask = task;
                                projectName = project.service_name;
                                taskName = updatedTask.task_name;
                            }
                        })
                    }

                })
            }

        })

        var oldStatus = updatedTask.status;

        updateTaskStatusP(taskId , newStatus)
        .then(function(success){
            if(success){
                dispatch({
                    type : ActionTypes.CHANGE_TASK_STATUS,
                    projectId : projectId,
                    selectedChannel ,selectedChannel,
                    taskId : taskId,
                    status : newStatus
                })
            }else{
                console.log("changeTaskStatus failed")
            }

            generateTaskStatusChange(selectedChannel,projectId,projectName,taskId,taskName,oldStatus , newStatus);
        })


    }

}