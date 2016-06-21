import React from 'react'
import statusNumberToName from './../../constants/StatusNumberToNameMap'
import DropDownWidget from './../common/DropDownWidget.react'
export default class ProjectTaskTile extends React.Component {
    constructor(props){
        super(props)
        this.changeTaskStatus = this.changeTaskStatus.bind(this);
    }

    static propTypes = {
        task : React.PropTypes.object.isRequired,
        changeTaskStatus : React.PropTypes.func.isRequired
    }

    changeTaskStatus(newStatus){
        let {changeTaskStatus , task} = this.props;
        changeTaskStatus(task.id , newStatus);
    }

    render(){
        const {task_name,status,id} = this.props.task;
        //console.log(this.props.task);
        var optionsKeyToNameMapping = {};

        Object.keys(statusNumberToName).forEach(function(statusNum){
            optionsKeyToNameMapping[statusNum.toString()] = statusNumberToName[statusNum]
        })

        return (
            <li className="project-task-tile">
                <div >
                    <div className="project-task-tile-name">{task_name}</div>

                    <div className="start-task-btn"> <a>Start task</a></div>
                    <div style={{float : "right"}}>
                        <DropDownWidget divId={"task-tile-status-dropdown"+id}
                                        defaultSelectedKey={status.toString()}
                                        optionKeyToNameMapping={optionsKeyToNameMapping}
                                        width = {200}
                                        onOptionSelected={this.changeTaskStatus}/>
                    </div>

                </div>
            </li>
        )
    }
}