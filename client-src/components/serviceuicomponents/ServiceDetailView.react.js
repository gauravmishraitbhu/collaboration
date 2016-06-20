import React from 'react'
import ProjectStageDetails from './ProjectStageDetails.react'

export default class ServiceDetailView extends React.Component {
    constructor(props){
        super(props);
    }

    static propTypes = {
        style : React.PropTypes.object.isRequired,
        project : React.PropTypes.object.isRequired
    }

    render(){
        const {service_name,magento_order,distributor_name,partner_name,client_name,stages,skuDeviceCount} = this.props.project
        return (
            <div style={this.props.style} className="project-detail-container">
                <div className="project-name">{service_name}</div>
                <div>
                    <div style={{display:"inline-block",width:"40%"}}> <b>Status :</b> TODO </div>
                    <div style={{display:"inline-block"}} > <b>Order# </b>{magento_order} </div>
                </div>
                <div>
                    <div style={{display:"inline-block",width:"30%"}}><b>Distributor:</b>{distributor_name}</div>
                    <div style={{display:"inline-block",width:"30%"}}><b>Partner:</b>{partner_name}</div>
                    <div style={{display:"inline-block"}}><b>Client:</b>{client_name}</div>
                </div>
                <ProjectStageDetails projectStages={stages} deviceCount={skuDeviceCount}/>
            </div>
        )
    }
}