import React, { ReactEventHandler, useState } from "react";
import { useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { NewType } from "../redux/types/news";
import '../styles/NewsList.scss';
import { TextBlock } from "./common";
import { NewsListItem } from './index';
import { sortByField } from '../functions/index';

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
    const {list, isLoading, error} = my ? myNews : subcribtions ? subscribtionsNews : favourites ? favouritesNews : {
        list: null,
        isLoading: false,
        error: null
    };
    const [currentList, setCurrentList] = useState<NewType[] | null>(null);
    const handleChange = (e: React.FormEvent): void => {
        const target = e.target as typeof e.target & {
            value: string
        }
        if(target.value.length > 0){
            const str = target.value;
            const regExp = new RegExp(`${str}`);
            setCurrentList(list ? list.filter(({tags}) => {
                return tags ? tags.join(',').match(regExp) : null;
            }) : null);
        }else{
            setCurrentList(list);
        }
    }

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

    useEffect(() => {
        setCurrentList(list);
    }, [list]);

    return(
        <NewsList   list={currentList} 
                    isLoading={isLoading} 
                    error={error ? error : null}
                    my={my ? true : false}
                    subcribtions={subcribtions ? true : false}
                    favourites={favourites ? true : false}
                    handleChange={handleChange}/>
    )
}

type NewsListProps = {
    list: NewType[] | null,
    isLoading: boolean,
    error: string | null,
    my: boolean,
    subcribtions?: boolean,
    favourites?: boolean,
    handleChange: ReactEventHandler
}

const NewsList: React.FC<NewsListProps> = ({
    list,
    isLoading,
    error,
    my,
    subcribtions,
    favourites,
    handleChange
}) => {
    const sortedList = list ? list.sort(sortByField('date')) : null;
    const listContent = sortedList ? sortedList.map((item, idx) => {
        return <NewsListItem    key={idx}
                                id={item.id}
                                body={item.body}
                                name={item.name}
                                surname={item.surname}
                                date={item.date}
                                tags={item.tags}
                                favouritesId={item.favouritesId}
                                my={my ? true : false}
                                subcribtions={subcribtions ? true : false}
                                favourites={favourites ? true : false}/>
    }) : <TextBlock text="Новостей нет" style={{margin: '0 auto'}}/>;
    const loadingContent = isLoading ? <TextBlock text="Загрузка" style={{margin: '0 auto'}}/> : null;
    const errorContent = error ? <TextBlock text={error} style={{margin: '0 auto'}}/> : null;
    return(
        <div className="news-list">
            <input type="text" autoComplete="false" onChange={handleChange} placeholder="Поиск по тегам..." className="news-list__search"></input>
            {isLoading ? loadingContent
            : error ? errorContent
            : listContent}
        </div>
    )
}

export default NewsListContainer;