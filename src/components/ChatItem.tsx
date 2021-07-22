import React from "react";
import '../styles/ChatItem.scss';

type ChatItemProps = {
    myMessage?: boolean;
    date: string;
    messageBody: string;
    userAvatar: string;
}

const ChatItem: React.FC<ChatItemProps> = ({date, messageBody, userAvatar, myMessage}) => {
    if(myMessage){
        return(
            <div className="chat__item my">
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

export default ChatItem;