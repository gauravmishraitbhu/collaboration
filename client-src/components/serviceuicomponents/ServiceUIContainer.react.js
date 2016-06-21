
import React from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import ServiceTopBar from './ServiceTopBar.react'
import ServiceTilesContainer from './ServiceTilesContainer.react'
import ServiceDetailView from './ServiceDetailView.react'

class ServiceUIParent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            selectedProject : null,
            left : 0
        }
        this.tweenState = {
            left : 0
        }

        this.selectProject = this.selectProject.bind(this);
        this.setTweenedState = this.setTweenedState.bind(this);
        this.onBackClicked = this.onBackClicked.bind(this);
    }

    static propTypes = {
        projectList : React.PropTypes.array.isRequired,
        selectedChannel : React.PropTypes.string.isRequired
    }

    setTweenedState(){
        this.setState({...this.state , left : this.tweenState.left})
    }

    onBackClicked(){
        this.setState({
            selectedProjectId : null,
            left : 0
        })
    }

    selectProject(projectId){
        this.setState({
            selectedProjectId : projectId,
            left : 700
        })
        this.tweenState.left = 700;
        TweenMax.to(this.tweenState ,0.5  , {left : 0 , onUpdate: this.setTweenedState})

    }



    componentWillReceiveProps(newProps) {
        // Do something with props...
        if(newProps.selectedChannel != this.props.selectedChannel){
            this.setState({
                selectedProject : null,
                left : 0
            })
        }
    }

    render(){

        var serviceDetailStyle = {};
        var serviceDetailNode = null;
        var {projectList} = this.props;
        var selectedProjectId = this.state.selectedProjectId;
        
        var selectedProject = projectList.filter(function(project){
            return project.id == selectedProjectId
        })[0]

        if(selectedProject != null){
            serviceDetailStyle.display = "block";
            serviceDetailStyle.left =  this.state.left;

            serviceDetailNode = <ServiceDetailView style={serviceDetailStyle} dispatch={this.props.dispatch}
            project = {selectedProject} />
        }

        return (
            <div className="serviceui-container">
                <ServiceTopBar selectedProject={selectedProject}
                               onBackClicked={this.onBackClicked}/>

                {serviceDetailNode}
                <ServiceTilesContainer projectList={ this.props.projectList }
                                       selectProjectCB={this.selectProject} />
            </div>
        )
    }
}



const mapStateToProps = (state) => {

    const {selectedChannel , dataByChannelId} = state;

    return {
        projectList : dataByChannelId[selectedChannel].projects,
        selectedChannel : selectedChannel
    }
}


const ServiceListContainer = connect(
    mapStateToProps,
    null
)(ServiceUIParent)

export default ServiceListContainer