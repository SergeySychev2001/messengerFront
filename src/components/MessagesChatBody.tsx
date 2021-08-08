import React from "react";
import {MessagesChatItem} from './index';
import '../styles/MessagesChatBody.scss';
import { useTypedSelector } from "../hooks/useTypedSelector";
import defaulAvatar from '../image/avatar.gif';
import { sortByField } from '../functions/index';

const MessagesChatBody: React.FC = () => {
    const { userData } = useTypedSelector(state => state.user);
    const { chatList, selectedUserId } = useTypedSelector(state => state.messages);
    const myAvatar = userData ? userData.avatar ? userData.avatar : defaulAvatar : defaulAvatar;
    const usedChat = chatList?.find((item) => item.user.id === selectedUserId);
    const sortedMessages = usedChat?.messages.sort(sortByField('date'));
    const content = sortedMessages?.map(({ date, id, isMy, value }) => {
        const formatedDate = new Date(date);
        const friendAvatar = usedChat ? usedChat.user.avatar : defaulAvatar; 
        return <MessagesChatItem 
                my={isMy}
                avatar={isMy ? myAvatar : friendAvatar}
                key={id} 
                date={`${formatedDate.getDate()}.${formatedDate.getMonth()}.${formatedDate.getFullYear()}`} 
                value={value} />
    });
    return(
        <div className="messages-chat-body">
            <ul className="chat__items">
                {content}
            </ul>
        </div>
    )
}

export default MessagesChatBody;