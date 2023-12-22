import React, { KeyboardEvent, useState } from 'react'
import style from './WriteTextBar.module.scss'
import { useAppDispatch, useAppSelector } from '@react-inlinesvg/redux/appHooks';
import { pushChat } from '@react-inlinesvg/redux/chatSlice';
function WriteTextBar({id}:{id?:number}) {
    const dispatch = useAppDispatch()
    const {rooms,selectedChat} = useAppSelector(state=>state.chats)
    const [text,setText] = useState('')
    const currentDate = new Date();
    const dateString = currentDate.toISOString();
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            dispatch(pushChat({id:id,data:{
                id: 0,
                sender: 'You',
                content: text,
                timestamp: dateString
            }}))
            setText('')
        } else if (e.key === 'Enter' && e.shiftKey) {
            const textarea = e.target as HTMLTextAreaElement;
            const value = textarea.value;
            const selectionStart = textarea.selectionStart || 0;
            const selectionEnd = textarea.selectionEnd || 0;
        
            // Insert a newline character at the current cursor position
            textarea.value =
              value.substring(0, selectionStart) +
              '\n' +
              value.substring(selectionEnd);
        
            // Move the cursor to the new line
            textarea.setSelectionRange(selectionStart + 1, selectionStart + 1);
        }
      };
    function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        
        e.preventDefault()
        dispatch(pushChat({id:id,data:{
            id: 0,
            sender: 'You',
            content: text,
            timestamp: dateString
        }}))
        setText('')
    }
  return (
    <form className={style.main} onSubmit={handleSubmit}>
        <textarea className={style.input} placeholder='Type a new message' value={text} onChange={e=>setText(e.target.value)} onKeyDown={handleKeyDown}/>
        <input className={style.input} type='submit' value={'Send'}/>
    </form>
  )
}

export default WriteTextBar