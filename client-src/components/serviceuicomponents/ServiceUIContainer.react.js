
import React from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import ServiceTopBar from './ServiceTopBar.react'
import ServiceTilesContainer from './ServiceTilesContainer.react'

class ServiceUIParent extends React.Component{

    static propTypes = {
        projectList : React.PropTypes.array.isRequired
    }

    render(){
        return (
            <div className="serviceui-container">
                <ServiceTopBar></ServiceTopBar>
                <ServiceTilesContainer projectList={ this.props.projectList } />
            </div>
        )
    }
}




const mapStateToProps = (state) => {

    const {selectedChannel , dataByChannelId} = state;

    return {
        projectList : dataByChannelId[selectedChannel].projects
    }
}


const ServiceListContainer = connect(
    mapStateToProps,
    null
)(ServiceUIParent)

export default ServiceListContainer