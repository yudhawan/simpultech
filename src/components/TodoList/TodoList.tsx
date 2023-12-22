import React, { useEffect,  useState } from 'react'
import cx from 'classnames'
import {  TimeDivisions, TodoListProp } from '../../types'
import IconComponent from '../icon/icon'
import { ArrowUpIcon,  ClockIcon,  MenuIcon, PenIcon } from '../../icons'
import { useAppDispatch, useAppSelector } from '../../redux/appHooks'
import { deleteTdl, setActive,  setChecked, setDate, setDesc } from '../../redux/tdlSlice'
import style from './TodoList.module.scss'
import BookmarkInput from '../BookmarkInput/BookmarkInput'
export type tagFn = {
    showTag:number
    setShowTag:(val:number)=>void
}
function TodoList({id,title,userId,completed,date,desc,bookmark,showTag,setShowTag}:TodoListProp&tagFn) {
    const [errors,setErrors] = useState<number[]>([])
    const [descText,setDescText] = useState('')
    const [savedDesc,setSavedDesc]=useState<number>(0)
    const [showMenu,setShowMenu]=useState<number>(0)
    const {active}=useAppSelector(state=>state.todos)
    const dispatch = useAppDispatch()
    const formatter = new Intl.RelativeTimeFormat(undefined, {
        numeric: 'auto'
      });
    function handleShowMenu(val:number) {
        if(val===showMenu) setShowMenu(0)
        else setShowMenu(val)
    }
    const TIME_DIVISIONS: TimeDivisions[] = [
        { amount: 60, name: 'seconds' },
        { amount: 60, name: 'minutes' },
        { amount: 24, name: 'hours' },
        { amount: 7, name: 'days' },
        { amount: 4.34524, name: 'weeks' },
        { amount: 12, name: 'months' },
        { amount: Number.POSITIVE_INFINITY, name: 'years' }
    ];
    
    function formatTimeAgo(date: string): string | undefined {
        const currentDate = new Date(date);
        let duration = (currentDate.getTime() - new Date().getTime()) / 1000;
        for (let i = 0; i < TIME_DIVISIONS.length; i++) {
            const division: TimeDivisions = TIME_DIVISIONS[i];
            if (division && Math.abs(duration) < division.amount) {
                return formatter.format(Math.round(duration), division.name);
            }
            if (division) duration /= division.amount;
            
        }
    }
    function formatDate(dateString:string) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0'); 
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const year = date.getFullYear();
      
        return `${day}/${month}/${year}`;
      }
    const handleKeyDown = (event:React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); 
            dispatch(setDesc({id:id,desc:descText}))
            setSavedDesc(id)
            document.getElementById(`${id}`)?.blur()
        } else if (event.key === 'Enter' && event.shiftKey) {
            setDescText(descText + '\n');
            event.preventDefault(); 
        }
    };
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value) {
            setErrors(errors.filter(val=>val!==id))
            dispatch(setDate({id:id,newDate:event.target.value}))
        }else{
            if(!errors.includes(id)) setErrors(prev=>([...prev,id]))
            dispatch(setDate({id:id,newDate:date}))
        }
      };
    useEffect(()=>{
        setTimeout(()=>{
            setSavedDesc(0)
        },1000)
    },[savedDesc])
  return (
    <li className={style.main}>
        <input className={style.checkbox} type='checkbox' checked={completed} onChange={(e)=> {
            dispatch(setChecked({checked:e.target.checked,id:id}))
            }} />
        <div className={style.infoBlock}>
            <div className={style.title}>
                <h4 className={completed?`${style.strike} ${style.titleText}`:style.titleText}>{title}</h4>
                <div className={style.titleDate}>
                    {!completed&&<span>{date&&formatTimeAgo(date)}</span>}
                    {<p>{date&&formatDate(date)}</p>}
                    <button className={style.button} onClick={()=>dispatch(setActive(id))}><IconComponent name={ArrowUpIcon} className={cx({[style.iconRotate]:!active?.includes(id)})} /></button>
                    <button className={style.buttonMenu} onClick={()=>handleShowMenu(id)}>
                        <IconComponent name={MenuIcon} />
                        {showMenu===id&&<ul className={style.menuDelete}>
                                <li className={style.buttonDelete}><button onClick={()=>dispatch(deleteTdl({id}))}>Delete</button></li>
                            </ul>}
                    </button>
                </div>
            </div>
            <div className={cx(style.infoBlockDesc,{
                [style.collapse]:active?.includes(id)
            })}>
                <div className={style.infoInline}>
                    <IconComponent name={ClockIcon} />
                    <div className={style.inputDateContainer}>
                        <input type='date' value={date} className={cx(style.inputDate,{[style.errorInput]:errors.includes(id)})}  onChange={handleDateChange} min={new Date().toISOString().split('T')[0]} disabled={completed} />
                    </div>
                </div>
                <div className={style.infoInline}>
                    <IconComponent name={PenIcon} className={style.penIcon} />
                    <textarea id={`${id}`} className={style.description} value={descText?descText:desc} placeholder='No Description, (Enter to save, Shift+Enter to Create a new line)' onChange={e=>setDescText(e.target.value)} onKeyDown={handleKeyDown} disabled={completed}></textarea>
                    {savedDesc===id&&<span className={style.alertSave}>Saved</span>}
                </div>
                <BookmarkInput id={id} bookmark={bookmark} setShowTag={setShowTag} showTag={showTag} key={id} />
                {/* <div className={style.infoInlineBookmark} onClick={e=>setShowTag(id)}>
                    {showTag==id&&<ul className={style.tagsList}>
                        {tagsList.map(val=> <li key={val.name} id={val.name}>
                            <button style={{backgroundColor:val.color}} onClick={(e)=>{
                                e.stopPropagation()
                                dispatch(setBookmark({id,tag:val}))}}>{val.name}</button>
                        </li>)}
                    </ul>}
                    <IconComponent name={BookmarkIcon} className={style.penIcon} />
                        {
                            bookmark?.map((val:BookmarkProp,index)=><div key={index} style={{backgroundColor:val.color}} className={style.tagContainer}>{val.name}<button className={style.buttonRemoveTag} onClick={(e)=>{
                                e.stopPropagation()
                                dispatch(deleteBookmark({id,tag:val}))}}><IconComponent name={CloseIcon} /></button></div>)
                        }
                </div> */}
            </div>
        </div>
    </li>
  )
}

export default TodoList