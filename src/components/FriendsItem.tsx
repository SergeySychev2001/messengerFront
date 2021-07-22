import React from "react";
import '../styles/FriendsItem.scss';

type FriendsItemProps = {
    name?: string;
    surname?: string
}

const FriendsItem: React.FC<FriendsItemProps> = ({name, surname}) => {
    return(
        <li className="friends__item">
            <span>{name}</span>
            <span>{surname}</span>
        </li>
    )
}

export default FriendsItem;