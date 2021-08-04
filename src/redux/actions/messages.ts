import { Dispatch } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { MessagesIsFetchType, MessagesIsLoadedType, MessagesIsFailedType, ChatListType} from '../types/messages';

const messagesIsFetchType = (): MessagesIsFetchType => {
    return{
        type: 'MESSAGES_IS_FETCH'
    }
};
const messagesIsLoadedType = (chatList: Array<ChatListType>): MessagesIsLoadedType => {
    return{
        type: 'MESSAGES_IS_LOADED',
        chatList
    }
};
const messagesIsFailedType = (error: string): MessagesIsFailedType => {
    return{
        type: 'MESSAGES_IS_FAILED',
        error
    }
};

const fetchMessages = () => (dispatch: Dispatch<any>) => {
    dispatch(messagesIsFetchType());
    fetch('http://localhost:4000/api/messages/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId: sessionStorage.getItem('userId')})
    })
    .then( async (res) => {
        const response = await res.json();
        if(res.status === 200){
            dispatch(messagesIsLoadedType(response));
        }
        if(res.status === 500){
            dispatch(messagesIsFailedType('Ошибка соединения'));
        }
    })
    .catch(err => dispatch(messagesIsFailedType('Ошибка соединения')));
}

export {
    fetchMessages
}