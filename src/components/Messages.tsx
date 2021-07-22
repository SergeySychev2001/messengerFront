import React from "react";
import { Chat, Friends } from "./index";
import '../styles/Messages.scss';

const Messages: React.FC = () => {
    return(
        <div className="messages">
            <div className="messages__friends">
                <Friends/>
            </div>
            <div className="messages__chat">
                <Chat/>
            </div>
        </div>
    )
}

export default Messages;