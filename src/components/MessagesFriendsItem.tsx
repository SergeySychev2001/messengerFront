import React from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import '../styles/MessagesFriendsItem.scss';

type MessagesFriendsItemProps = {
    id: string,
    name: string;
    surname: string
}

const MessagesFriendsItem: React.FC<MessagesFriendsItemProps> = ({name, surname, id}) => {
    const { selectedUserId } = useTypedSelector(state => state.messages);
    const { userIsSelected } = useActions();
    return(
        <li onClick={() => userIsSelected(id)} 
        className="messages-friends-item" 
        style={selectedUserId === id ? 
            {backgroundColor: 'white', color: 'black'} : 
            undefined}
        >
            <span>{surname} {name}</span>
        </li>
    )
}

export default MessagesFriendsItem;