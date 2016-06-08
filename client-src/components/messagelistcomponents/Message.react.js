import React from 'react'
import { getUserNameFromUUID } from './../../utils/Users'

export default class Message extends React.Component{

    static propTypes = {
        message : React.PropTypes.object.isRequired
    }

    render (){
        const {text , senderUUID} = this.props.message;
        let userName = getUserNameFromUUID(senderUUID);
        return (
            <div className="message-card">
                <div className="sender-name"> {userName} </div>
                {text}
            </div>
        )
    }
}