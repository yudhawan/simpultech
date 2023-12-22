import React from 'react'
import style from './HeaderRoomChat.module.scss'
import { ModelConsumer } from '../../common/ModelContext'
import IconComponent from '../icon/icon'
import { BackIcon, CloseIcon } from '../../icons'
function HeaderRoomChat({title='',participants=0}:{title:string,participants:number}) {
  return (
    <div className={style.infoHeader}>
        <div className={style.infoTitle}>
        <ModelConsumer>
          {
            ({setStateId,setStateIsOpen}:any)=>
            <button className={style.buttonSet} onClick={()=>{
              setStateId('chatContainer')
            }}>
              <IconComponent name={BackIcon} />
            </button>
          }
        </ModelConsumer>
        <div className={style.headerInfo}>
          <h4>{title}</h4>
          <span>{participants} participants</span>
        </div>
        <div className={style.infoBlock}></div>
        </div>
        <ModelConsumer>
          {
            ({setStateId,setStateIsOpen}:any)=>
            <button className={style.buttonSet} onClick={()=>{
              setStateId('')
              setStateIsOpen(false)
            }}>
              <IconComponent name={CloseIcon} />
            </button>
          }
        </ModelConsumer>
      </div>
  )
}

export default HeaderRoomChat