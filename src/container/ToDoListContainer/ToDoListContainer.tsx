import React, { useEffect, useState } from 'react'
import style from './ToDoListContainer.module.scss'
import { useAppDispatch, useAppSelector } from '../../redux/appHooks'
import { getTodos, setFilter } from '../../redux/tdlSlice'
import TodoList from '../../components/TodoList/TodoList'
import { TodoListProp } from '../../types'
import { ModelConsumer } from '../../common/ModelContext'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
function ToDoListContainer() {
  const dispatch = useAppDispatch()
  const [showTag,setShowTag] = useState<number>(0)
  const {data,isLoading,filter}=useAppSelector(state=>state.todos)
  const handleTag=(id:number)=>{
    if(showTag===id) setShowTag(0)
    else setShowTag(id)
  }
  useEffect(()=>{
    dispatch(getTodos())
  },[])
  return (
    <div className={style.main}>
        <div className={style.headerContainer}>
            <select className={style.selectContainer} defaultValue={filter?filter:''} onChange={(e)=>dispatch(setFilter({filter:e.target.value}))} >
              <option value={''} disabled hidden>My Tasks</option>
              <option value={'errands'}>personal errands</option>
              <option value={'urgent'}>urgent to-do</option>
            </select>
            <ModelConsumer>
              {
                ({setStateIsOpen,setStateId}:any)=><button className={style.buttonBlue} onClick={()=>setStateId('tdlForm')}>new task</button>
              }
            </ModelConsumer>
            
        </div>
        {isLoading&&<LoadingComponent/>}
        {
          data?.map((val: TodoListProp) => (
            <TodoList
                id={val.id}
                title={val.title}
                completed={val.completed}
                userId={val.userId}
                date={val.date || ''}
                key={val.id}
                desc={val.desc}
                bookmark={val.bookmark}
                showTag={showTag}
                setShowTag={handleTag}
            />
          ))
        
        }
    </div>
  )
}

export default ToDoListContainer