import React from 'react'
import style from './ChatText.module.scss'
import { useAppSelector } from '../../redux/appHooks'
import HeaderRoomChat from '../HeaderRoomChat/HeaderRoomChat'
import WriteTextBar from '../WriteTextBar/WriteTextBar'
import BodyChatList from '../BodyChatList/BodyChatList'
function ChatTextContainer() {
  const {selectedChat}= useAppSelector(state=>state.chats)
  return (
    <section className={style.main}>
      <HeaderRoomChat participants={selectedChat?.participants.length || 0} title={selectedChat?.title || ''} />
      <BodyChatList id={selectedChat?.id} />
      <WriteTextBar id={selectedChat?.id}/>
    </section>
  )
}

export default ChatTextContainer