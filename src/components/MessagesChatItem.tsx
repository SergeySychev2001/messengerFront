import React from "react";
import '../styles/MessagesChatItem.scss';

type MessagesChatItemProps = {
    myMessage?: boolean;
    date: string;
    messageBody: string;
    userAvatar: string;
}

const MessagesChatItem: React.FC<MessagesChatItemProps> = ({date, messageBody, userAvatar, myMessage}) => {
    if(myMessage){
        return(
            <div className="messages-chat-item">
                <div className="item__message-body">{messageBody}</div>
                <div className="item__user-avatar">
                    <img src={userAvatar} alt="" />
                </div>
                <div className="item__date">{date}</div>
            </div>
        )
    }else{
        return(
            <div className="chat__item">
                <div className="item__message-body">{messageBody}</div>
                <div className="item__user-avatar">
                    <img src={userAvatar} alt="" />
                </div>
                <div className="item__date">{date}</div>
            </div>
        );
    }
    
}

export default MessagesChatItem;