import React from "react";
import { useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { NewType } from "../redux/types/news";
import '../styles/NewsList.scss';
import { TextBlock } from "./common";
import { NewsListItem } from './index';

type NewsListContainerProps = {
    my?: boolean,
    subcribtions?: boolean,
    favourites?: boolean
}

const NewsListContainer: React.FC<NewsListContainerProps> = ({
    my,
    subcribtions,
    favourites
}) => {
    const { fetchMyNewsList, fetchSubscribtionsNewsList, fetchFavouritesNewsList } = useActions();
    const { my: myNews, subscribtions: subscribtionsNews, favourites: favouritesNews } = useTypedSelector(state => state.news);
    const usedState = my ? myNews : subcribtions ? subscribtionsNews : favourites ? favouritesNews : {
        list: null,
        isLoading: false,
        error: null
    };
    const {list, isLoading, error} = usedState;

    useEffect(() => {
        if(my){
            fetchMyNewsList();
        }
        if(subcribtions){
            fetchSubscribtionsNewsList();
        }
        if(favourites){
            fetchFavouritesNewsList();
        }
    }, [my, subcribtions, favourites]);

    return(
        <NewsList list={list} isLoading={isLoading} error={error ? error : null}/>
    )
}

type NewsListProps = {
    list: NewType[] | null,
    isLoading: boolean,
    error: string | null
}

const NewsList: React.FC<NewsListProps> = ({
    list,
    isLoading,
    error
}) => {
    const listContent = list?.map((item, idx) => {
        return <NewsListItem    key={idx}
                                body={item.body}
                                name={item.name}
                                surname={item.surname}
                                date={item.date}/>
    });
    const loadingContent = isLoading ? <TextBlock text="Загрузка"/> : null;
    const errorContent = error ? <TextBlock text={error}/> : null;
    return(
        <div className="news-list" style={  isLoading ? {display: 'flex', justifyContent: 'center'} 
                                            : error ? {display: 'flex', justifyContent: 'center'}
                                            : undefined}>
            {isLoading ? loadingContent
            : error ? errorContent
            : listContent}
        </div>
    )
}

export default NewsListContainer;