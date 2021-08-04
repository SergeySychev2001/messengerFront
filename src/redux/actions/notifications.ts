import { NotificationsListItemIsAdded, NotificationsListItemIsDeleted } from '../types/notifications';

const notificationsListItemIsAdded = (value: string): NotificationsListItemIsAdded => {
    const id = Math.floor(Math.random() * 10000);
    return {
        type: 'NOTIFICATIONS_LIST_ITEM_IS_ADDED',
        payload: {
            id,
            value
        }
    }
}

const notificationsListItemIsDeleted = (id: number): NotificationsListItemIsDeleted => {
    return {
        type: 'NOTIFICATIONS_LIST_ITEM_IS_DELETED',
        id
    }
}

export {
    notificationsListItemIsDeleted,
    notificationsListItemIsAdded
}