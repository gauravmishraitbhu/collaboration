import React from 'react'
import ProjectStageTile from './ProjectStageTile.react'
import ProjectTaskListComponent from './ProjectTaskListComponent.react'

export default class ProjectStageDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedStageId : props.projectStages[0].id
        }
        this.selectProjectStage = this.selectProjectStage.bind(this);
    }

    static propTypes = {
        projectStages : React.PropTypes.array.isRequired
    }

    selectProjectStage(stageId){
        this.setState({...this.state,
            selectedStageId : stageId
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

        return (
            <div className="project-stage-details-container">
                <ul>
                    {projectStageTiles}
                </ul>
                <div className="project-stage-date-row">
                    <div style={{display : "inline-block"}}><b>Start Date:</b> <i>{startDate}</i></div>
                    <div style={{float : "right"}}><b>End Date:  </b><i>{endDate}</i></div>
                </div>
                <b>Tasks For </b> <i>{selectedStage.stage_name}</i> :
                <ProjectTaskListComponent tasks={selectedStage.tasks} stageSeqNumber={selectedStage.stage_seq_num}/>
            </div>
        )
    }
}