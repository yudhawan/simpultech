import React from 'react'
import style from './ModalOpen.module.scss'
import ChatContainer from '../ChatContainer/ChatContainer'
import ChatText from '../../components/ChatText/ChatText'
import ToDoListContainer from '../ToDoListContainer/ToDoListContainer'
import CreateFormTodo from '../CreateFormTodo/CreateFormTodo'
function ModalOpen({id}:{id:string}) {
    return<div className={style.main}>
        {

            (id==='chatContainer')&& <ChatContainer/>
        }
        {
            (id==='chat') && <ChatText/>
        }
        {
            (id==='tdlContainer')&& <ToDoListContainer/>
        }
        {
            (id==='tdlForm')&& <CreateFormTodo/>
        }

    </div>
}

export default ModalOpen