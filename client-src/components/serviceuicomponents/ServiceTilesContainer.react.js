import React from 'react';
import ServiceTile from './ServiceTile.react'

export default class ServiceTilesContainer extends React.Component {

    static propTypes = {
        projectList : React.PropTypes.arrayOf(React.PropTypes.object.isRequired)
    }

    render(){

        var key = 0;
        var serviceTiles = this.props.projectList.map(function(project){
            return < ServiceTile key={key++} project={project} />
        })

        return (
            <div className="service-tiles-container col-sm-12">
                {serviceTiles}
            </div>
        )
    }
}