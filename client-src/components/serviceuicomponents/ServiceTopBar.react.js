import React from 'react';


export default class ServiceTopBar extends React.Component {
    static propTypes = {
        selectedProject : React.PropTypes.object,
        onBackClicked : React.PropTypes.func.isRequired
    }

    render(){

        var projectNameComp = null;

        if(this.props.selectedProject){
            projectNameComp = this.props.selectedProject.service_name;
        }

        return (
            <div className="service-topbar">
                <div id="topbar-back-btn" onClick={this.props.onBackClicked}> &lt; </div>
                <div id="service-label">Services</div>
                <div id="topbar-service-name"> { projectNameComp }</div>
            </div>
        )
    }
}