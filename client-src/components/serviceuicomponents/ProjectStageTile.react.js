import React from 'react'
import classNames from 'classnames'

export default class ProjectStageTile extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    static propTypes = {
        projectStage : React.PropTypes.object.isRequired,
        selectProjectStage : React.PropTypes.func.isRequired
    }

    handleClick(){
        const {projectStage , selectProjectStage} = this.props;

        selectProjectStage(projectStage.id);
    }

    render(){

        const {stage_name , status} = this.props.projectStage

        var tileClass;
        if(status == 2){
            tileClass = classNames({
                "project-stage-tile" : true,
                "completed" : true
            })
        }else{
            tileClass = classNames({
                "project-stage-tile" : true,
                "completed" : false
            })
        }

        return (
            <li className={tileClass} onClick={this.handleClick}>
                <div className="project-stage-tile-name">{stage_name}</div>
            </li>
        )
    }
}