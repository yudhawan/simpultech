import React from 'react'
import { tagsList } from '../../common/Tags'
import { useAppDispatch } from '../../redux/appHooks'
import IconComponent from '../icon/icon'
import { BookmarkIcon, CloseIcon } from '../../icons'
import { deleteBookmark, setBookmark } from '../../redux/tdlSlice'
import { BookmarkInputProp, BookmarkProp } from '../../types'
import style from './BookmarkInput.module.scss'

function BookmarkInput({id,bookmark,showTag,setShowTag,dispatchFn,dispatchFnDelete,propagation=true}:BookmarkInputProp) {
    const dispatch = useAppDispatch()
    function handleSetBookmark(e:React.MouseEvent<HTMLButtonElement, MouseEvent>,val:BookmarkProp) {
        propagation&&e.stopPropagation()
        if(!dispatchFn) dispatch(setBookmark({id,tag:val}))
        else dispatchFn(val)
    }
    function handleDeleteBookmark(e:React.MouseEvent<HTMLButtonElement, MouseEvent>,val:BookmarkProp) {
        propagation&&e.stopPropagation()
        if(!dispatchFnDelete) dispatch(deleteBookmark({id,tag:val}))
        else dispatchFnDelete(val)
    }
  return (
    <div className={style.infoInlineBookmark} onClick={e=>setShowTag(id)}>
        {showTag==id&&<ul className={style.tagsList}>
            {tagsList.map(val=> <li key={val.name} id={val.name}>
                <button style={{backgroundColor:val.color}} onClick={(e)=>handleSetBookmark(e,val)}>{val.name}</button>
            </li>)}
        </ul>}
        <IconComponent name={BookmarkIcon} className={style.penIcon} />
            {
                bookmark?.map((val:BookmarkProp,index)=><div key={index} style={{backgroundColor:val.color}} className={style.tagContainer}>{val.name}<button className={style.buttonRemoveTag} onClick={(e)=> handleDeleteBookmark(e,val)}><IconComponent name={CloseIcon} /></button></div>)
            }
    </div>
  )
}

export default BookmarkInput