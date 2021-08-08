type MessagesStateType = {
    chatList: Array<ChatListType> | undefined,
    loading: boolean,
    error: string | undefined
    selectedUserId: string | undefined
}

type ChatListType = {
    user: UserType
    messages: Array<MessageType>
}

type MessageType = {
    id: string,
    date: Date,
    isMy: boolean,
    value: string
}

type UserType = {
    id: string,
    name: string,
    surname: string,
    avatar: string
}

type MessagesIsFetchType = {
    type: 'MESSAGES_IS_FETCH'
}

type MessagesIsLoadedType = {
    type: 'MESSAGES_IS_LOADED',
    chatList: Array<ChatListType>
}

type MessagesIsFailedType = {
    type: 'MESSAGES_IS_FAILED',
    error: string
}

type MessageIsAddedType = {
    type: 'MESSAGE_IS_ADDED',
    message: MessageType,
    user: UserType
}

type MyMessageIsAddedType = {
    type: 'MY_MESSAGE_IS_ADDED',
    message: MessageType
}

type UserIsSelected = {
    type: 'USER_IS_SELECTED',
    userId: string
}

type ActionType = {
    type: 'MESSAGES_IS_FETCH' |
    'MESSAGES_IS_LOADED' |
    'MESSAGES_IS_FAILED' |
    'MESSAGE_IS_ADDED' |
    'USER_IS_SELECTED' |
    'MY_MESSAGE_IS_ADDED',
    chatList: Array<ChatListType>,
    error: string,
    message: MessageType,
    user: UserType,
    userId: string
}

export type {
    MessagesStateType,
    MessagesIsFetchType,
    MessagesIsLoadedType,
    MessagesIsFailedType,
    MessageIsAddedType,
    MyMessageIsAddedType,
    ChatListType,
    UserIsSelected,
    ActionType,
    MessageType,
    UserType
}