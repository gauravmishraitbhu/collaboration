import React from 'react'
import ProjectStageTile from './ProjectStageTile.react'

export default class ProjectStageDetails extends React.Component{
    constructor(props){
        super(props);

    }

    static propTypes = {
        projectStages : React.PropTypes.array.isRequired
    }

    render(){

        var projectStageTiles = this.props.projectStages.map(function(stage , index){
            return <ProjectStageTile projectStage={stage} key={index}/>
        })

        return (
            <div className="project-stage-details-container">
                <ul>
                    {projectStageTiles}
                </ul>
            </div>
        )
    }
}