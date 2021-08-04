import React from "react";
import '../styles/MessagesFriendsItem.scss';

type MessagesFriendsItemProps = {
    name?: string;
    surname?: string
}

const MessagesFriendsItem: React.FC<MessagesFriendsItemProps> = ({name, surname}) => {
    return(
        <li className="messages-friends-item">
            <span>{surname} {name}</span>
        </li>
    )
}

export default MessagesFriendsItem;