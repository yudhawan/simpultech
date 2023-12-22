'use client'
import React, { useState } from 'react'
import style from './FloatButton.module.scss'
import IconComponent from '../icon/icon'
import { CommentIconActive,CommentIcon,BookIcon,BookIconActive } from '../../icons'
import { ModelConsumer } from '../../common/ModelContext'
function FloatButton() {
  const [buttonActive,setButtonActive] = useState({
    chat:false,
    book:false
  })

  return (
    <div className={style.floatContainer}>
        <div className={style.floatButtonContainer}>
            <span className={style.bgbuttonTdl}></span>
            <ModelConsumer>
              {
                ({setStateIsOpen,setStateId}:any)=>
                <button className={style.floatButton} onClick={()=>{
                  setButtonActive(prev=> ({...prev,book:!buttonActive.book}))
                  setStateIsOpen(!buttonActive.book)
                  setStateId('tdlContainer')
                  }}>
                <IconComponent name={buttonActive.book?BookIconActive:BookIcon} />
                </button>
             }
             </ModelConsumer>
        </div>
        <div className={style.floatButtonContainer}>
            <span className={style.bgbuttonMsg} style={{right:buttonActive.chat?'':'-4px'}}></span>
            <ModelConsumer>
              {
                ({setStateIsOpen,setStateId}:any)=>
                <button className={style.floatButton} onClick={()=>{
                    setButtonActive(prev=> ({...prev,chat:!buttonActive.chat}))
                    setStateIsOpen(!buttonActive.chat)
                    setStateId('chatContainer')
                  }}>
                  <IconComponent name={buttonActive.chat?CommentIconActive:CommentIcon} />
                </button>
              }
            </ModelConsumer>
        </div>
    </div>
  )
}

export default FloatButton