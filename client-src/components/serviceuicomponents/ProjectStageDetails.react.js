import React from 'react'
import ProjectStageTile from './ProjectStageTile.react'
import ProjectTaskListComponent from './ProjectTaskListComponent.react'
import DropDownWidget from './../common/DropDownWidget.react'
import {changeTaskStatus as changeProjectTaskStaus} from './../../actions/AppAction'
export default class ProjectStageDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedStageId : props.projectStages[0].id,
            selectedDeviceId : 0
        }
        this.selectProjectStage = this.selectProjectStage.bind(this);
        this.selectSkuDevice = this.selectSkuDevice.bind(this);
        this.changeTaskStatus = this.changeTaskStatus.bind(this);
    }

    componentDidMount(){

    }

    static propTypes = {
        projectId : React.PropTypes.number.isRequired,
        projectStages : React.PropTypes.array.isRequired,
        deviceCount : React.PropTypes.number,
        dispatch : React.PropTypes.func.isRequired
    }

    changeTaskStatus(taskId , newStatus){
        let {projectId,dispatch} = this.props;
        dispatch(changeProjectTaskStaus(projectId ,taskId , newStatus));
    }

    selectProjectStage(stageId){

        var that = this;
        var selectedStage = this.props.projectStages.filter(function(stage){
            return stage.id == stageId
        })[0]

        var selectedSkuDeviceId = 0;
        if(!selectedStage.isProjectLevel && selectedStage.stage_seq_num != 1){
            selectedSkuDeviceId = selectedStage.tasks[0].sku_device;
        }

        this.setState({...this.state,
            selectedStageId : stageId,
            selectedDeviceId : selectedSkuDeviceId
        })
    }

    selectSkuDevice(deviceId){
        this.setState({...this.state,
            selectedDeviceId : deviceId
        })
    }

    render(){

        var that = this;
        var projectStageTiles = this.props.projectStages.map(function(stage , index){
            return <ProjectStageTile projectStage={stage} key={index}
                                     selectProjectStage={that.selectProjectStage}/>
        })

        var selectedStage = this.props.projectStages.filter(function(stage){
            return stage.id == that.state.selectedStageId
        })[0]

        if(selectedStage.actual_start_date){
            var startDate = selectedStage.actual_start_date;
        }else{
            var startDate = "not started";
        }

        if(selectedStage.actual_end_date){
            var endDate = selectedStage.actual_end_date
        }else{
            var endDate = "not started";
        }



        var skuDeviceNode = null;
        var tasksToDisplay = null
        if(!selectedStage.isProjectLevel && selectedStage.stage_seq_num != 1){

            var optionKeyToNameMapping = {};
            var deviceCounter = 1;
            for(var i = 0 ; i < selectedStage.tasks.length ; i++){
                if(optionKeyToNameMapping[selectedStage.tasks[i].sku_device] == null){
                    optionKeyToNameMapping[selectedStage.tasks[i].sku_device] = deviceCounter.toString();
                    deviceCounter++;
                }

            }


            skuDeviceNode = (<DropDownWidget divId={"project-stage-sku-device-selector"}
                                             label = {"Select Device:"}
                                            optionKeyToNameMapping={optionKeyToNameMapping}
                                            onOptionSelected={this.selectSkuDevice}/>)
            tasksToDisplay = []
            var deviceCount = this.props.deviceCount;
            var selectedDeviceId = this.state.selectedDeviceId;

            selectedStage.tasks.forEach(function(task){
                if(task.sku_device == selectedDeviceId){
                    tasksToDisplay.push(task);
                }
            })


        }else{
            skuDeviceNode = null
            tasksToDisplay = selectedStage.tasks;
        }

        return (
            <div className="project-stage-details-container">
                <ul>
                    {projectStageTiles}
                </ul>
                <div className="project-stage-date-row">
                    <div style={{display : "inline-block"}}><b>Start Date:</b> <i>{startDate}</i></div>
                    <div style={{float : "right"}}><b>End Date:  </b><i>{endDate}</i></div>
                </div>
                <div style={{marginTop:"10px"}}>
                    <b>Tasks For </b> <i>{selectedStage.stage_name}</i> :
                    {skuDeviceNode}
                </div>
                <ProjectTaskListComponent tasks={tasksToDisplay}
                                          changeTaskStatus={this.changeTaskStatus}
                                           stageSeqNumber={selectedStage.stage_seq_num} />
            </div>
        )
    }
}