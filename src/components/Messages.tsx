import React, { useEffect } from "react";
import { MessagesChat, MessagesFriends } from "./index";
import '../styles/Messages.scss';
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { TextBlock } from './common';

const MessagesContainer: React.FC = () => {

    const { fetchMessages, notificationsListItemIsAdded, messageIsAdded } = useActions();
    const { loading, error} = useTypedSelector(state => state.messages);
    const { socket } = useTypedSelector(state => state.socket);

    useEffect(() => {
        fetchMessages();
        socket?.off('sendMessageToClient');
        socket?.on('sendMessageToClient', ({data}) => {
            messageIsAdded(data.message, data.user);
        });
        return (() => {
            socket?.off('sendMessageToClient');
            socket?.on('sendMessageToClient', (data) => {
                notificationsListItemIsAdded('Получено сообщение');
            });
        });
    }, [socket]);

    if(loading){
        return <TextBlock text="Загрузка сообщений..." style={{marginTop: '20px'}}/>
    }
    if(error){
        return <TextBlock text={error} style={{marginTop: '20px'}}/>
    }
    return <Messages/>
}

const Messages: React.FC = () => {
    return(
        <div className="messages">
                <MessagesFriends/>
                <MessagesChat/>
        </div>
    )
}

export default MessagesContainer;