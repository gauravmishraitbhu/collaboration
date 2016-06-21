import React from 'react';
import ServiceTileProjectStatus from './ServiceTileProjectStatus.react'

export default class ServiceTile extends React.Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        this.props.selectProjectCB(this.props.project.id);
    }

    static propTypes = {
        project : React.PropTypes.object.isRequired,
        selectProjectCB : React.PropTypes.func.isRequired
    }

    render(){

        const {service_name , actual_start_date , stages} = this.props.project
        var serviceName;
        var startDate ;

        if(service_name == null){
            serviceName = "Default"
        }else{
            serviceName = service_name;
        }

        if(actual_start_date == null){
            startDate = "not started"
        }else{
            startDate = actual_start_date;
        }
        return (
            <div className="service-tile" onClick={this.handleClick}>
                <div className="tile-project-name">
                    {serviceName}
                </div>
                <div className="tile-start-date-label">
                    Start Date:
                </div>
                <div className="tile-start-date">
                    {startDate}
                </div>
                <ServiceTileProjectStatus projectStages={stages} />

            </div>
        )
    }
}