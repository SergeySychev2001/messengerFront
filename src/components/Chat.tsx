import React from "react";
import { ChatBody, ChatInput} from './index';
import '../styles/Chat.scss';

const Chat: React.FC = () => {
    return(
        <div className="chat">
            <ChatBody/>
            <ChatInput/>
        </div>
    )
}

export default Chat;