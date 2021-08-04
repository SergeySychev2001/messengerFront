import React from "react";
import {MessagesChatItem} from './index';
import '../styles/MessagesChatBody.scss';

const MessagesChatBody: React.FC = () => {
    return(
        <div className="messages-chat-body">
            <ul className="chat__items">
                <MessagesChatItem messageBody="ef" userAvatar="https://i.pinimg.com/236x/42/70/c6/4270c6302785f06a3084434284b25a9a.jpg" date="21.01.01"/>                
            </ul>
        </div>
    )
}

export default MessagesChatBody;