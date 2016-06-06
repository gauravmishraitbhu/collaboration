import React from 'react'


export default class Message extends React.Component{

    static propTypes = {
        text : React.PropTypes.string.isRequired
    }

    render (){
        return (
            <div className="message-card">
                <div className="sender-name"> Diva </div>
                {this.props.text}
            </div>
        )
    }
}