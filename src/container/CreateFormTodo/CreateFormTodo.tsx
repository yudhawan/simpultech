import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import IconComponent from '../../components/icon/icon'
import { ModelConsumer } from '../..//common/ModelContext'
import { BackIcon } from '../../icons'
import { BookmarkProp, inputType } from '../../types'
import BookmarkInput from '../../components/BookmarkInput/BookmarkInput'
import { useAppDispatch, useAppSelector } from '../../redux/appHooks'
import style from './CreateFormTodo.module.scss'
import { postTodo } from '../../redux/tdlSlice'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
function CreateFormTodo() {
  const [bookmarks,setBookmarks] = useState<BookmarkProp[]>([])
  const [showTag,setShowTag] = useState<number>(0)
  const [validation,setValidation] = useState<string>('')
  const dispatch = useAppDispatch()
  const {isLoading} = useAppSelector(state=>state.todos)
  const handleTag=(id:number)=>{
    if(showTag===id) setShowTag(0)
    else setShowTag(id)
  }

  const pushBookmark =(val:BookmarkProp)=> {
    const bookmarkExists = bookmarks.some(b => b.name === val.name)
    if(!bookmarkExists) setBookmarks(prev=>([...prev,val]))
  }
  const handleDeleteTag =(val:BookmarkProp)=> {
    const bookmarkExists = bookmarks.filter(b => b.name !== val.name)
    setBookmarks(bookmarkExists)
  }
  const {
    register,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm<inputType>()
  const onSubmit= (e:React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault()
    if(!getValues('title')) return setValidation('Title')
    if(!getValues('date')) return setValidation('Expired date')
    const data={
      title:getValues('title'),
      date:getValues('date'),
      desc:getValues('desc'),
      bookmark:bookmarks,
    }

    dispatch(postTodo(data))
  }
  useEffect(()=>{
    if(watch('title')!=='') setValidation('')
    if(watch('date')!=='') setValidation('')
  },[watch('title'),watch('date')])
  useEffect(()=>{
    if(!isLoading) {
      setBookmarks([])
      reset()
    }
  },[isLoading])
  return (
    <section className={style.main}>
      <div className={style.infoHeader}>
        <div className={style.infoTitle}>
        <ModelConsumer>
          {
            ({setStateId,setStateIsOpen}:any)=>
            <button className={style.buttonSet} onClick={()=>{
              setStateId('tdlContainer')
            }}>
              <IconComponent name={BackIcon} />
            </button>
          }
        </ModelConsumer>
          <div className={style.infoBlock}></div>
        </div>
      </div>
      {isLoading?<LoadingComponent/>:<form className={style.formInput}>
          <input placeholder="Title*" className={style.input} {...register("title", { required: true })} />
          <div className={style.formLabelContainer}>
            <label>Expired date*</label>
            <input placeholder="test" className={style.input} {...register("date", { required: true })} type='date' min={new Date().toISOString().split('T')[0]} />
          </div>
          <textarea className={style.description} placeholder='No Description, (Enter to save, Shift+Enter to Create a new line)' {...register('desc')}></textarea>
          

          <BookmarkInput id={1} showTag={showTag} setShowTag={handleTag} bookmark={bookmarks} dispatchFn={pushBookmark} propagation={false} dispatchFnDelete={handleDeleteTag} />
          <input type="submit" className={style.input} onClick={onSubmit} />
          {validation && <span className={style.error}>This field {validation} is required</span>}
      </form>}
    </section>
  )
}

export default CreateFormTodo