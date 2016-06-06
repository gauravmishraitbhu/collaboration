import React from 'react';
import { connect } from 'react-redux'
import Message from './Message.react'

export default class MessageListParent extends  React.Component{
    static propTypes={
        selectedCategory : React.PropTypes.string.isRequired,
        messages : React.PropTypes.arrayOf(React.PropTypes.shape({
            text : React.PropTypes.string.isRequired
        }))
    }

    render(){

        console.log(this.props);
        var messages = this.props.messages.map(function(message , index){
            return <Message text={message.text} key={index} />
        })

        return (
            <div className="message-container">
                {messages}
            </div>
        )
    }
}

function getMessages(state){
    var selecterChannel = state.selectedChannel;
    var channeldata = state.dataByChannelId[selecterChannel];
    var selectedCategory = state.selectedCategory;

    return channeldata[selectedCategory];
}

const mapStateToProps = (state) => {
    return {
        selectedCategory: state.selectedCategory,
        messages : getMessages(state)
    }
}


const MessageListContainer = connect(
    mapStateToProps,
    null
)(MessageListParent)

export default MessageListContainer