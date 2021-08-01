type NotificationsStateType = {
    list: Array<NotificationType> | null
}

type NotificationType = {
    id: number,
    value: string
}

type NotificationsListItemIsAdded = {
    type: 'NOTIFICATIONS_LIST_ITEM_IS_ADDED',
    payload: NotificationType
}

type NotificationsListItemIsDeleted = {
    type: 'NOTIFICATIONS_LIST_ITEM_IS_DELETED',
    id: number
}

type ActionType = {
    type: 'NOTIFICATIONS_LIST_ITEM_IS_ADDED'
    | 'NOTIFICATIONS_LIST_ITEM_IS_DELETED',
    payload: NotificationType,
    id: number
}

export type {
    NotificationsStateType,
    NotificationType,
    NotificationsListItemIsAdded,
    NotificationsListItemIsDeleted,
    ActionType
}