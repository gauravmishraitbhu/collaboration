import React from 'react'

export default class ServiceDetailView extends React.Component {
    constructor(props){
        super(props);
    }

    static propTypes = {
        style : React.PropTypes.object.isRequired
    }

    render(){
        return (
            <div style={this.props.style} className="project-detail-container">

            </div>
        )
    }
}