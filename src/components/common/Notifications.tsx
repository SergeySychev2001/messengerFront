import React from "react";
import '../../styles/common/Notifications.scss';
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { NotificationType } from '../../redux/types/notifications';
import closeBtn from '../../image/close-btn.svg';
import { useState } from "react";
import { useEffect } from "react";

const NotificationsContainer: React.FC = () => {
    const {list} = useTypedSelector(state => state.notifications);
    return <Notifications list={list ? list : undefined}/>
}

type NotificationsProps = {
    list?: NotificationType[]
}

const Notifications: React.FC<NotificationsProps> = ({
    list
}) => {
    const notifications = list ?
    list.map(({id, value}) => <NotificationsItem key={id} id={id} value={value}/>) :
    undefined
    return(
        <div className="notifications">
            <div className="notifications__container">
                {notifications}
            </div>
        </div>
    )
}

type NotificationItemProps = {
    id: number,
    value: string
}

const NotificationsItem: React.FC<NotificationItemProps> = ({
    id,
    value
}) => {
    const { notificationsListItemIsDeleted } = useActions();
    const [isStyle, setIsStyle] = useState<boolean>(false);
    const style = {opacity: 0};
    const deleteNotificationItem = () => {
        setIsStyle(true);
        setTimeout(() => notificationsListItemIsDeleted(id), 300);
    }
    useEffect(() => {
        const timeout = setTimeout(() => deleteNotificationItem(), 3000);
        return () => clearTimeout(timeout);
    }, []);
    return (
        <div className="notifications__item" style={isStyle ? style : undefined}>
            <img className="item__close" onClick={ async () => deleteNotificationItem()} 
            src={closeBtn} alt="Закрыть"/>
            <span className="item__value">{value}</span>
        </div>
    )
}

export default NotificationsContainer;