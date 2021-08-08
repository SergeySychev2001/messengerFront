import React from "react";
import { MessagesFriendsItem } from "./index";
import '../styles/MessagesFriends.scss';
import { useTypedSelector } from "../hooks/useTypedSelector";


const MessagesFriends: React.FC = () => {

    const { chatList } = useTypedSelector(state => state.messages);
    const content = chatList?.map(({user}) => {
        return <MessagesFriendsItem key={user.id} id={user.id} name={user.name} surname={user.surname}/>
    });
    
    return(
        <ul className="messages-friends">
            {content}
        </ul>
    )
}

export default MessagesFriends;