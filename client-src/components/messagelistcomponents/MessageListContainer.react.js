import React from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Message from './Message.react'
import ChatComponent from './ChatComponent.react'
import {sendMessage as sendMessageToPubnub} from './../../actions/AppAction'

class MessageListParent extends  React.Component{

    constructor(props){
        super(props);
        this.sendMessage = this.sendMessage.bind(this);
    }

    static propTypes={
        selectedCategory : React.PropTypes.string.isRequired,
        messages : React.PropTypes.arrayOf(React.PropTypes.shape({
            text : React.PropTypes.string.isRequired
        })),
        selectedChannel : React.PropTypes.string.isRequired,
        dispatch : React.PropTypes.func.isRequired
    }

    sendMessage(text){
        var data = {
            type : "chats",
            text : text
        }
        sendMessageToPubnub(this.props.selectedChannel , data);

    }

    componentDidMount(){
        var node = ReactDOM.findDOMNode(this.refs.msg_list);
        node.scrollTop = node.scrollHeight
    }

    componentDidUpdate(){
        var node = ReactDOM.findDOMNode(this.refs.msg_list);
        node.scrollTop = node.scrollHeight
    }

    render(){

        console.log(this.props);
        var messages = this.props.messages.map(function(message , index){
            return <Message text={message.text} key={index} />
        })

        return (
            <div className="message-container">
                <div className="message-category-selector">
                    <div className="category_type">Chats</div>
                    <div className="category_type">Notifications</div>
                </div>
                <div className="message-container-inner" ref="msg_list">
                    {messages}
                </div>
                <ChatComponent sendMessage={this.sendMessage} />
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
        messages : getMessages(state),
        selectedChannel : state.selectedChannel
    }
}


const MessageListContainer = connect(
    mapStateToProps,
    null
)(MessageListParent)

export default MessageListContainer