import React, { ReactElement } from "react";
import '../styles/MessagesChatItem.scss';
import defaultAvatar from '../image/avatar.gif';

type MessagesChatItemProps = {
    my?: boolean;
    date: string;
    value: string;
    avatar?: string;
}

const MessagesChatItem: React.FC<MessagesChatItemProps> = ({date, value, avatar, my}) => {
    return(
        <div className={my ? 'messages-chat-item my' : 'messages-chat-item'}>
            <img src={avatar ? avatar : defaultAvatar} alt="" className="item__avatar" />
            <div className="item__body">
                <span className="item__date">{date}</span>
                <span className="item__value">{value}</span>
            </div>
        </div>
    )
}

export default MessagesChatItem;