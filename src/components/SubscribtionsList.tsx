import React, { ReactEventHandler, useState } from "react";
import '../styles/SubscribtionsList.scss';
import { useEffect } from "react";
import { SubscribtionsItem } from ".";
import Months from "../enums/months";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { UserType } from "../redux/types/subscriptions";
import { TextBlock } from "./common";

type SubscribtionsListContainerProps = {
    isAll?: boolean
}

const SubscribtionsListContainer: React.FC<SubscribtionsListContainerProps> = ({
    isAll
}) => {

    const {subscribtionsList, searchList} = useTypedSelector(state => state.subscriptions);
    const {error, isLoading, list} = isAll ? searchList : subscribtionsList;

    const {fetchSubscribtionsList, fetchSearchList} = useActions();
    const [currentList, setCurrentList] = useState(list);

    useEffect(() => {
        isAll === true ? fetchSearchList() : fetchSubscribtionsList();
    }, [isAll]);

    useEffect(() => {
        setCurrentList(list)
    }, [list]);

    const handleChange = (e: React.FormEvent): void => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            value: string
        }
        if(target.value.length > 0){
            const str = target.value;
            const regExp = new RegExp(`${str}`);
            setCurrentList(list ? list.filter(item => item.surname.match(regExp)) : null);
        }else{
            setCurrentList(list);
        }
    }

    return(
        <SubscribtionsList  isAll={isAll} 
                            handleChange={handleChange} 
                            error={error} 
                            isLoading={isLoading} 
                            list={currentList}/>
    )
}

type SubscribtionsListProps = {
    isAll?: boolean,
    list: Array<UserType> | null,
    isLoading: boolean,
    error: string | null,
    handleChange: ReactEventHandler
}

const SubscribtionsList: React.FC<SubscribtionsListProps> = ({
    isAll,
    list,
    isLoading,
    error,
    handleChange
}) => {
    const listMap = list ? list.map(item => {
        if(item.id !== sessionStorage.getItem('userId')){
            return <SubscribtionsItem   key={item.id} 
                                        id={item.id} 
                                        name={item.name} 
                                        surname={item.surname} 
                                        avatar={item.avatar}
                                        year={item.year}
                                        month={Months[item.month]}
                                        day={item.day}
                                        city={item.city}
                                        isAll={isAll}/>
        }
    }) : null;

    const listContent = listMap ? (
        <div className="subscribtions-list__result">
              {listMap}  
        </div>
    ) : <TextBlock text='Подписок нет'/>;

    const errorContent = error ? <TextBlock text={error}/> : null;
    const loadingContent = isLoading ? <TextBlock text='Загрузка'/> : null;

    return(
        <div className="subscribtions-list">
            <form className="subscribtions-list__form">
                <input  className="form__input" 
                        autoComplete="off" 
                        onChange={handleChange} 
                        name="search" 
                        type="text" 
                        placeholder="Введите фамилию"/>
            </form>
            {isLoading ? loadingContent : error ? errorContent : listContent}
        </div>
    )
}

export default SubscribtionsListContainer;