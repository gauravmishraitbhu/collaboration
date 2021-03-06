import React from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Message from './Message.react'
import Notification from './Notification.react'
import ChatComponent from './ChatComponent.react'
import {sendMessage as sendMessageToPubnub,selectCategory} from './../../actions/AppAction'
import MessageCategory from './MessageCategory.react'

class MessageListParent extends  React.Component{

    constructor(props){
        super(props);
        this.sendMessage = this.sendMessage.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
    }

    static propTypes={
        selectedCategory : React.PropTypes.string.isRequired,
        messages : React.PropTypes.arrayOf(React.PropTypes.shape({
            text : React.PropTypes.string
        })),
        selectedChannel : React.PropTypes.string.isRequired,
        dispatch : React.PropTypes.func.isRequired
    }

    sendMessage(textMsg){

        sendMessageToPubnub(this.props.selectedChannel , textMsg);

    }

    selectCategory(newCategory){
        const {dispatch} = this.props;
        dispatch(selectCategory(newCategory))
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

        const {messages , selectedCategory} = this.props;

        var messageNodes = this.props.messages.map(function(message , index){
            if(selectedCategory == "chats"){
                return <Message message={message} key={index} />
            }else{
                return <Notification message={message} key={index}/>
            }

        })

        let isChatSelected = (this.props.selectedCategory == "chats")
        return (
            <div className="message-container">
                <div className="message-category-selector">
                    <MessageCategory isCurrentSelection={isChatSelected} selectCategory={this.selectCategory.bind(this,"chats")}>Chats</MessageCategory>
                    <MessageCategory isCurrentSelection={!isChatSelected} selectCategory={this.selectCategory.bind(this,"notifications")} >Notifications</MessageCategory>
                </div>
                <div className="message-container-inner" ref="msg_list">
                    {messageNodes}
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