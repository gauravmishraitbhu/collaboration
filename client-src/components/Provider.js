import React from 'react';

import ReactDOM from 'react-dom';

var Provider =  class Provider extends React.Component{

    getChildContext (){
        return {
            store : this.props.store
        }
    }

    render(){

        return this.props.children;
    }
}

Provider.childContextTypes = {
    store : React.PropTypes.object
}

export default Provider;