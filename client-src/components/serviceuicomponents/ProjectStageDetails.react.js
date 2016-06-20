import React from 'react'
import ProjectStageTile from './ProjectStageTile.react'
import ProjectTaskListComponent from './ProjectTaskListComponent.react'
import DropDownWidget from './../common/DropDownWidget.react'
export default class ProjectStageDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedStageId : props.projectStages[0].id,
            selectedDeviceNum : 0
        }
        this.selectProjectStage = this.selectProjectStage.bind(this);
        this.selectSkuDevice = this.selectSkuDevice.bind(this);
    }

    static propTypes = {
        projectStages : React.PropTypes.array.isRequired,
        deviceCount : React.PropTypes.number
    }

    selectProjectStage(stageId){
        this.setState({...this.state,
            selectedStageId : stageId
        })
    }

    selectSkuDevice(deviceNum){
        this.setState({...this.state,
            selectedDeviceNum : deviceNum
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

        var optionKeyToNameMapping = {};
        for(var i = 1 ; i <= this.props.deviceCount ; i++){
            optionKeyToNameMapping[i-1] = i.toString();
        }

        var skuDeviceNode = null;
        var tasksToDisplay = null
        if(!selectedStage.isProjectLevel && selectedStage.stage_seq_num != 1){
            skuDeviceNode = (<DropDownWidget divId={"project-stage-sku-device-selector"}
                                            optionKeyToNameMapping={optionKeyToNameMapping}
                                            onOptionSelected={this.selectSkuDevice}/>)
            tasksToDisplay = []
            var deviceCount = this.props.deviceCount;
            var selectedDeviceNum = this.state.selectedDeviceNum;

            for(var i = selectedDeviceNum ; i<selectedStage.tasks.length ;){
                tasksToDisplay.push(selectedStage.tasks[i])
                i += deviceCount;
            }


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
                <ProjectTaskListComponent tasks={tasksToDisplay} stageSeqNumber={selectedStage.stage_seq_num}/>
            </div>
        )
    }
}