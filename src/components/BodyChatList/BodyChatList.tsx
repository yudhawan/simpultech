import React, { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../redux/appHooks'
import style from './BodyChatList.module.scss'
import { chatRoomType, chatsType } from '../../types'
import IconComponent from '../icon/icon'
import { MenuIcon } from '@react-inlinesvg/icons'
function BodyChatList({id}:{id:number|undefined}) {
    const chatContainerRef = useRef<HTMLUListElement>(null);
    const [showMenu,setShowMenu] = useState<number>(NaN)
    const {rooms}= useAppSelector(state=>state.chats)
    function handleMenu(id:number) {
        console.log(id)
        if(id===showMenu) setShowMenu(NaN)
        else setShowMenu(id)
    }
    useEffect(() => {
        const scrollToBottom = () => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        };
    
        scrollToBottom();
      }, [rooms]);
  return (
    <ul className={style.main} ref={chatContainerRef}>
        {rooms?.filter(val=>val.id===id)[0]?.['messages'].map((val:chatRoomType,index)=>{
            const date = new Date(val.timestamp);
            const formattedTime = `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;
            if(val.sender.toLocaleLowerCase()==='you') return <li key={index} style={{alignSelf:'end'}} className={style.right}>
                {/* {rooms?.filter(val=>val.id===id)[0]?.['messages'][index]['sender']==='You'?<></>:<span className={style.nameRight}>{val.sender}</span>} */}
                <span className={style.nameRight}>{val.sender}</span>
                <div className={style.contentContainerRight}>
                    <p className={style.contentRight}>
                        <span>{val.content}</span>
                        <span className={style.timeFormat}>{formattedTime}</span>
                    </p>
                    <button className={style.menuButtonRight} onClick={()=>handleMenu(val.id)}>
                        <IconComponent name={MenuIcon} />
                        {showMenu===val.id&&<ul className={style.menuRight} >
                            <li className={style.menuListRight}><button>Edit</button></li>
                            <li className={style.menuListRight}><button>Delete</button></li>
                        </ul>}
                    </button>
                </div>
            </li>
            return <li key={index}>
                    <span className={style.name}>{val.sender}</span>
                    <div className={style.contentContainer}>
                        <p className={style.content}>
                            <span>{val.content}</span>
                            <span className={style.timeFormat}>{formattedTime}</span>
                        </p>
                        <button className={style.menuButton} onClick={()=>handleMenu(val.id)}>
                            <IconComponent name={MenuIcon} />
                            {showMenu===val.id&&<ul className={style.menu}>
                                <li className={style.menuList}><button>Edit</button></li>
                                <li className={style.menuList}><button>Delete</button></li>
                            </ul>}
                        </button>
                    </div>
                </li>
        })}
    </ul>
  )
}

export default BodyChatList