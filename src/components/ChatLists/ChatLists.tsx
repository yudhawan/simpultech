import React from 'react'
import style from './ChatLists.module.scss'
import IconComponent from '../icon/icon'
import { UserIcon } from '../../icons'
import { ModelConsumer } from '../../common/ModelContext'
import { useAppDispatch, useAppSelector } from '../../redux/appHooks'
import { chatRoomType } from '../../types'
import { setChat } from '../../redux/chatSlice'

function ChatLists() {
    const dispatch = useAppDispatch()
    const {rooms}= useAppSelector(state=>state.chats)
    const formatDateTime = (timestamp: string): string => {
        const date = new Date(timestamp);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return date.toLocaleDateString('en-US', options);
    };
    const messageWithLatestTimestamp = (messages: chatRoomType[]): React.ReactNode => {
        const time = messages.reduce((prev:chatRoomType, current:chatRoomType) => {
            return (new Date(prev.timestamp) > new Date(current.timestamp)) ? prev : current;
            }, {
                id: 0,
                sender: '',
                content: '',
                timestamp: '',
            });
        return <span>{formatDateTime(time.timestamp)}</span>
    }
    const getLastChat = (messages: chatRoomType[]): React.ReactNode => {
        const data = messages.reduce((prev:chatRoomType, current:chatRoomType) => {
            return (new Date(prev.timestamp) > new Date(current.timestamp)) ? prev : current;
            }, {
                id: 0,
                sender: '',
                content: '',
                timestamp: '',
            });
            
        return <div className={style.infoBlockChatContainer}>
                    <div className={style.infoLastChat}>
                        <p>{data.sender}:</p>
                        <span>{data.content}</span>
                    </div>
                </div>
    }
  return (
    <ul className={style.main}>
        {
            rooms.map((val,index)=>{
            return (<li key={index} className={style.liContainer}>
                <ModelConsumer>
                    {
                        ({setStateIsOpen,setStateId}:any)=>
                        <button className={style.listContainer} onClick={()=>{
                            dispatch(setChat(val.id))
                            setStateId('chat')
                            setStateIsOpen(true)
                        }}>
                            <section className={style.userIconContainer}>
                                <span className={style.userIcon}><IconComponent name={UserIcon}/></span>
                                <span className={style.userIconBlue}><IconComponent name={UserIcon}/></span>
                            </section>
                            <section className={style.infoBlockContainer}>
                                <div className={style.infoBlockContainerTitle}>
                                    <h4>{val.title}</h4>
                                    {messageWithLatestTimestamp(val.messages)}
                                </div>
                                {getLastChat(val.messages)}
                            </section>
                        </button>
                    }
                </ModelConsumer>
                  
            </li>)})
        }
        
    </ul>
  )
}

export default ChatLists