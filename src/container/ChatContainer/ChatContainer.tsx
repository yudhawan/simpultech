import React from 'react'
import style from './ChatContainer.module.scss'
import IconComponent from '../../components/icon/icon'
import {SearchIcon}from '../../icons'
import ChatLists from '../../components/ChatLists/ChatLists'
function ChatContainer() {
  
  return (
    <div className={style.main}>
        <div className={style.searchContainer}>
            <input type='text' placeholder='Search' className={style.input} />
            <button className={style.buttonSearch}>
                <IconComponent name={SearchIcon} />
            </button>
        </div>
        <ChatLists/>
    </div>
  )
}

export default ChatContainer