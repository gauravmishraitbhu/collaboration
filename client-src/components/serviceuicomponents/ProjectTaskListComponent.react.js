import React from 'react'
import ProjectTaskTile from './ProjectTaskTile.react'

export default class ProjectTaskListComponent extends React.Component {
    constructor(props){
        super(props)
    }

    static propTypes = {
        tasks : React.PropTypes.array.isRequired,
        stageSeqNumber : React.PropTypes.number.isRequired
    }

    render(){

        var taskLists = this.props.tasks.map(function(task , index){
            return <ProjectTaskTile task={task} key={index}/>
        })
        return (
            <ul>
                {taskLists}
            </ul>
        )
    }
}