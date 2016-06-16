import React from 'react';


export default class ServiceTopBar extends React.Component {
    static propTypes = {
        selectedProject : React.PropTypes.object
    }

    render(){

        var projectNameComp = null;

        if(this.props.selectedProject){
            projectNameComp = this.props.selectedProject.service_name;
        }

        return (
            <div className="service-topbar">
                <div id="service-label">Services</div>
                <div id="topbar-service-name"> { projectNameComp }</div>
            </div>
        )
    }
}