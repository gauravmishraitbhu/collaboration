import React from 'react'
import { getUserNameFromUUID } from './../../utils/Users'
import { getFormatedTime } from './../../utils/TimeUtils'
import {getTextFromStatusChangeNotification} from './../../utils/NotificationHelper'

export default class Notification extends React.Component{

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
                    <span className="sender-name"> System: </span>
                    <span className="message-date"> {dateStr} </span>
                </div>
                <div dangerouslySetInnerHTML={{ __html : getTextFromStatusChangeNotification(this.props.message)}}>
                </div>

            </div>
        )
    }
}