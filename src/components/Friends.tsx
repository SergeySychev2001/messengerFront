import React from "react";
import { FriendsItem } from "./index";
import '../styles/Friends.scss';


const Friends: React.FC = () => {
    return(
        <ul className="friends">
            <FriendsItem name="Sergey" surname="Sychev"/>
            <FriendsItem name="Sergey" surname="Sychev"/>
        </ul>
    )
}

export default Friends;