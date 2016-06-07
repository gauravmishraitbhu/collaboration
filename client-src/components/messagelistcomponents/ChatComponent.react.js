import React from 'react'

export default class ChatComponent extends React.Component{

    constructor( props ){
        super(props)
        this.onSendClicked = this.onSendClicked.bind(this);
    }

    static propTypes = {
        sendMessage : React.PropTypes.func.isRequired
    }

    onSendClicked(e){
        const {sendMessage} = this.props;
        sendMessage(this.refs.text_msg.value);
        this.refs.text_msg.value="";
    }

    render(){
        return (
            <div className="chat-comp-container">
                <textarea className="chat-textbox" ref="text_msg">

                </textarea>
                <button className="send-msg-btn" onClick={this.onSendClicked}>
                    Send
                </button>
            </div>

        )
    }
}