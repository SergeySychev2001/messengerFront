import React from "react";
import {ChatItem} from './index';
import '../styles/ChatBody.scss';

const ChatBody: React.FC = () => {
    return(
        <div className="chat__body">
            <ul className="chat__items">
                <ChatItem messageBody="ef" userAvatar="https://i.pinimg.com/236x/42/70/c6/4270c6302785f06a3084434284b25a9a.jpg" date="21.01.01"/>
                <ChatItem messageBody="ef" userAvatar="https://i.pinimg.com/236x/42/70/c6/4270c6302785f06a3084434284b25a9a.jpg" date="21.01.01"/>
                <ChatItem messageBody="ef" userAvatar="https://i.pinimg.com/236x/42/70/c6/4270c6302785f06a3084434284b25a9a.jpg" date="21.01.01"/>
                <ChatItem myMessage={true} messageBody="ef" userAvatar="https://i.pinimg.com/236x/42/70/c6/4270c6302785f06a3084434284b25a9a.jpg" date="21.01.01"/>
                <ChatItem messageBody="ef" userAvatar="https://i.pinimg.com/236x/42/70/c6/4270c6302785f06a3084434284b25a9a.jpg" date="21.01.01"/>
                <ChatItem myMessage={true} messageBody="ef" userAvatar="https://i.pinimg.com/236x/42/70/c6/4270c6302785f06a3084434284b25a9a.jpg" date="21.01.01"/>
                <ChatItem messageBody="ef" userAvatar="https://i.pinimg.com/236x/42/70/c6/4270c6302785f06a3084434284b25a9a.jpg" date="21.01.01"/>
                <ChatItem messageBody="ef" userAvatar="https://i.pinimg.com/236x/42/70/c6/4270c6302785f06a3084434284b25a9a.jpg" date="21.01.01"/>
                <ChatItem messageBody="ef" userAvatar="https://i.pinimg.com/236x/42/70/c6/4270c6302785f06a3084434284b25a9a.jpg" date="21.01.01"/>
                <ChatItem myMessage={true} messageBody="ef" userAvatar="https://i.pinimg.com/236x/42/70/c6/4270c6302785f06a3084434284b25a9a.jpg" date="21.01.01"/>
                <ChatItem messageBody="ef" userAvatar="https://i.pinimg.com/236x/42/70/c6/4270c6302785f06a3084434284b25a9a.jpg" date="21.01.01"/>
                <ChatItem messageBody="ef" userAvatar="https://i.pinimg.com/236x/42/70/c6/4270c6302785f06a3084434284b25a9a.jpg" date="21.01.01"/>
                <ChatItem myMessage={true} messageBody="ef" userAvatar="https://i.pinimg.com/236x/42/70/c6/4270c6302785f06a3084434284b25a9a.jpg" date="21.01.01"/>
                
            </ul>
        </div>
    )
}

export default ChatBody;