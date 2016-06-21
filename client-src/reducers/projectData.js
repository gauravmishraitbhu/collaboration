import ActionTypes from './../constants/ActionTypes'

export function getProjectList(projectList=[] , action){
    switch (action.type){
        case ActionTypes.CHANGE_TASK_STATUS:
        {
            var projectId = action.projectId;
            var taskId = action.taskId;
            var newStatus = action.status;

            var newData = [];
            projectList.forEach(function(project){
                newData.push(getProjectData(project , action))
            })
            return newData;
        }
        default:{
            return projectList;
        }
    }
}

function getProjectData(project={} , action){
    switch (action.type){
        case ActionTypes.CHANGE_TASK_STATUS:
        {
            var projectId = action.projectId;
            var taskId = action.taskId;
            var newStatus = action.status;

            var newProjectData = {...project,
                stages : getStageList(project.stages , action)

            };

            return newProjectData;
        }
        default:{
            return project;
        }
    }
}

function getStageList(stageList = [] , action){
    switch (action.type){
        case ActionTypes.CHANGE_TASK_STATUS:
        {
            var newList = [];

            stageList.forEach(function(stage){
                newList.push(getStageData(stage,action))
            })

            return newList;
        }
        default:{
            return stageList;
        }
    }
}

function getStageData(stageData = {} ,action ){
    switch (action.type){
        case ActionTypes.CHANGE_TASK_STATUS:
        {
            var newData = {...stageData,
                tasks : getTaskList(stageData.tasks , action)

            }

            return newData;
        }
        default:{
            return stageData;
        }
    }
}

function getTaskList(taskList = [] , action){
    switch (action.type){
        case ActionTypes.CHANGE_TASK_STATUS:
        {
            var projectId = action.projectId;
            var taskId = action.taskId;
            var newStatus = action.status;

            var newTaskList = [];
            taskList.forEach(function(task){
                newTaskList.push(getTaskData(task , action));
            })
            return newTaskList;
        }
        default:{
            return taskList;
        }
    }
}

function getTaskData(task = {} , action){
    switch (action.type){
        case ActionTypes.CHANGE_TASK_STATUS:
        {
            var projectId = action.projectId;
            var taskId = action.taskId;
            var newStatus = action.status;

            if(taskId == task.id){
                var newtask = {...task,
                    status : newStatus
                }
            }else{
                var newtask = task;
            }
            return newtask;
        }
        default:{
            return task;
        }
    }
}