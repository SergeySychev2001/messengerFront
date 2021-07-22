import React from "react";
import '../styles/NewsListItem.scss';

type NewsListItemProps = {
    body: string,
    name: string,
    surname: string,
    date: string
}

const NewsListItem: React.FC<NewsListItemProps> = ({
    body,
    name,
    surname,
    date
}) => {
    return(
        <div className="news-list-item">
            <span className="item__text">{body}</span>
            <div className="item__info">
                <span className="item__user">{surname} {name}</span>
                <span className="item__data">{date}</span>
            </div>
        </div>
    )
}

export default NewsListItem;