import React from 'react'
import { getUserNameFromUUID } from './../../utils/Users'
import { getFormatedTime } from './../../utils/TimeUtils'

export default class Message extends React.Component{

    static propTypes = {
        message : React.PropTypes.object.isRequired
    }

    render (){
        const {text , senderUUID , time } = this.props.message;
        let userName = getUserNameFromUUID(senderUUID);
        let dateStr = getFormatedTime(time);
        return (
            <div className="message-card">
                <div>
                    <span className="sender-name"> {userName} </span>
                    <span className="message-date"> {dateStr} </span>
                </div>

                {text}
            </div>
        )
    }
}