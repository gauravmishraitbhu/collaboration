import React from 'react'
import statusNumberToName from './../../constants/StatusNumberToNameMap'
export default class ProjectTaskTile extends React.Component {
    constructor(props){
        super(props)
    }

    static propTypes = {
        task : React.PropTypes.object.isRequired
    }

    render(){
        const {task_name,status} = this.props.task;
        return (
            <li className="project-task-tile">
                <div >
                    <div className="project-task-tile-name">{task_name}</div>

                    <div style={{float : "right"}}>{statusNumberToName[status]}</div>
                    <div className="start-task-btn"> <a>Start task</a></div>

                </div>
            </li>
        )
    }
}