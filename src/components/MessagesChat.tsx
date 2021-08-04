import React from "react";
import { MessagesChatBody, MessagesChatInput} from './index';
import '../styles/MessagesChat.scss';

const MessagesChat: React.FC = () => {
    return(
        <div className="messages-chat">
            <MessagesChatBody/>
            <MessagesChatInput/>
        </div>
    )
}

export default MessagesChat;