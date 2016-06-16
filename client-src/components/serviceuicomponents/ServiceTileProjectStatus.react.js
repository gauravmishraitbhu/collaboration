import React from 'react';


export default class ServiceTileProjectStatus extends React.Component {

    static propTypes = {
        projectStages : React.PropTypes.array.isRequired
    }

    render(){
        const {projectStages} = this.props;

        projectStages.sort(function(stage1 , stage2){
            return stage1.stage_seq_num - stage2.stage_seq_num;
        })

        var stagesMap = {
            1 : "IN-PROGRESS",
            2 : "COMPLETED",
            3 : "TODO",
            4 : "BLOCKED",
            5 : "WAITING-ON-CUSTOMER",
            6 : "ON-HOLD",
            8 : "STARTED"
        }

        var stageComponents = projectStages.map(function(stage , index){
            var style={};
            if(stage.status == 2){
                style.backgroundColor = "#006400"
            }else if(stage.status == 8){
                style.backgroundColor = "#FFFF66"

                style.borderRight="1px solid"
                style.borderColor = "black"
            }
            else{
                style.backgroundColor = "#B22222"

                style.borderRight="1px solid"
                style.borderColor = "black"

            }
            return <div className="project-status-box" key={index} style={style}> </div>
        })

        return (
            <div className="centered-project-status-container">
                <div className="tile-project-status-container">
                    {stageComponents}
                </div>
            </div>
        )
    }
}