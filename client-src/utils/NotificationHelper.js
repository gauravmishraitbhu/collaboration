import NotificationTypes from './../constants/NotificationTypes'
import {getCurrentUser} from './AppManager'
import {getUserNameFromUUID} from './Users'
import {sendMessage} from './PubnubMessagePublisher'
import StatusNumberToNameMap from './../constants/StatusNumberToNameMap'

export function generateTaskStatusChange(channelId ,projectId ,projectName, taskId ,taskName, oldStatus , newStatus){
    var currentUserId = getCurrentUser().uuid;
    var data = {
        type : "notifications",
        notificationType : NotificationTypes.UPDATE_TASK_STATUS,
        params : {
            projectId : projectId,
            taskId : taskId,
            taskName : taskName ,
            projectName : projectName,
            oldStatus : oldStatus ,
            newStatus : newStatus
        },
        senderUUID : currentUserId
    }

    sendMessage(channelId , data);
}

export function getTextFromStatusChangeNotification(message){
    const {taskId , oldStatus , newStatus, projectName , taskName } = message.params;
    var userName = getUserNameFromUUID(message.senderUUID)
    var oldStatusName = StatusNumberToNameMap[oldStatus]
    var newStatusName = StatusNumberToNameMap[newStatus]

    var text = "Updated Task : <span style='color: #00B7FF'>" + taskName + "</span> of Project : <span style='color: #00B7FF'>" +projectName + "</span><br/>"
    text += "User:<span style='color: #00d6b2'>" + userName + " </span> changed status from <span style='color: #bf616a'>" +oldStatusName
    text += " </span> to <span style='color: #bf616a'>" + newStatusName + "</span>";
    return text;
}