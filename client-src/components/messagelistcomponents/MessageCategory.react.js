import React from 'react';
import classNames from 'classnames'

export default class MessageCategory extends React.Component{
    constructor(props){
        super(props);
        this.onClicked = this.onClicked.bind(this);
    }

    static propTypes={
        selectCategory : React.PropTypes.func.isRequired,

        //to indicate if category represeneted by this instance is selected one
        isCurrentSelection : React.PropTypes.bool.isRequired
    }

    onClicked(e){
        this.props.selectCategory();
    }

    render(){
        var classNamesCurrent = classNames({
            "category_type" : true,
            "selected" : this.props.isCurrentSelection
        })

        return (
            <div className={classNamesCurrent} onClick={this.onClicked}>
                {this.props.children}
            </div>
        )
    }
}