import { BookmarkProp, TodoListProp, TodosRedux, inputType } from '../types'
import { createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

function getRandomDate() {
  const today = new Date()
  const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
  const oneWeekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

  const randomTimestamp = Math.random() * (oneWeekLater.getTime() - oneWeekAgo.getTime()) + oneWeekAgo.getTime()

  const randomDate = new Date(randomTimestamp)

  return randomDate.toISOString().split('T')[0]
}
function generateRandomNumber(): number {
  return Math.floor(Math.random() * (1000 - 500 + 1)) + 500
}
export const postTodo = createAsyncThunk('tdl/postTodo',async(data:inputType,{dispatch})=>{
  const results = await fetch('https://jsonplaceholder.typicode.com/todos',{
    method:'post',
    body:JSON.stringify(data),
    headers:{
      'Content-type': 'application/json; charset=UTF-8',
    }
  })
  const todo = await results.json()
  todo.id=generateRandomNumber()
  return todo
})
export const getTodos = createAsyncThunk('tdl/getTodos',async()=>{
  
  const results = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
  const data = await results.json()
  if(data.length){
    
    const currentDate = new Date()
    data.map((val:TodoListProp)=>{
        val.date=getRandomDate()
        val.desc=''
        const inputDate = val.date?new Date(val.date):''
        if(inputDate < currentDate) val.completed=true
        else val.completed=false
    })    
    return data
  }
  return []
})


const initialState: TodosRedux = {
  isLoading:false,
  data:[],
  active:[],
  filter:''
}

export const chatSlice = createSlice({
  name: 'tdl',
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<number>) => {
      if(state.active?.filter(val=>val==action.payload)?.length) state.active=state.active?.filter(val=>val!==action.payload)
      else state.active?.push(action.payload)
    },
    setDate: (state,{payload}:{payload:{newDate:string,id:number}})=>{
      const updatedData = state.data.map((item) => {
        if (item.id === payload.id) {
          return { ...item, date: payload.newDate }
        }
        return item
      })
      state.data=updatedData
    },
    setDesc:(state,{payload}:{payload:{desc:string,id:number}})=>{
      const updatedDesc = state.data.map((item) => {
        if (item.id === payload.id) {
          return { ...item, desc: payload.desc }
        }
        return item
      })
      state.data=updatedDesc
    },
    deleteTdl:(state,{payload}:{payload:{id:number}})=>{
      const updatedDesc = state.data.filter(val=> val.id!==payload.id)
      state.data=updatedDesc
    },
    setChecked:(state,{payload}:{payload:{checked:boolean,id:number}})=>{
      const updateChecked = state.data.map((item) => {
        if (item.id === payload.id) {
          if(payload.checked && state.active?.filter(val=>val===payload.id).length) state.active= state.active?.filter(val=>val!==payload.id)
          else state.active?.push(payload.id)
          return { ...item, completed: payload.checked }
        }
        return item
      })
      state.data=updateChecked
    },
    setBookmark:(state,{payload}:{payload:{tag:BookmarkProp,id:number}})=>{
        const updatedData = state.data.map(todo => {
          if (todo.id === payload.id) {
            const existingBookmark = todo.bookmark || []
            const bookmarkExists = existingBookmark.some(b => b.name === payload.tag.name)
            if (!bookmarkExists) {
              const updatedBookmark = [...existingBookmark, payload.tag]
              return { ...todo, bookmark: updatedBookmark }
            }
            
            return { ...todo }
          }
          return todo
        })
        state.data = updatedData
    },
    deleteBookmark:(state,{payload}:{payload:{tag:BookmarkProp,id:number}})=>{
      const updatedData = state.data.map(todo => {
        if (todo.id === payload.id) {
          const existingBookmark = todo.bookmark || []
          const bookmarkExists = existingBookmark.filter(b => b.name !== payload.tag.name)
            return { ...todo, bookmark: bookmarkExists }
        }
        return todo
      })
      state.data = updatedData
    },
    setFilter:(state,{payload}:{payload:{filter:string}})=>{
      state.filter=payload.filter
      const updatedData = payload.filter==='urgent'?state.data.sort((a, b) => {
          if (a.completed !== b.completed) {
              return a.completed ? 1 : -1
          } 
          else {
              const dateA = a.date ? new Date(a.date) : null
              const dateB = b.date ? new Date(b.date) : null
              if (!dateA && !dateB) return 0
              if (!dateA) return 1
              if (!dateB) return -1
              return dateA.getTime() - dateB.getTime()
          }
      }):state.data
      state.data = updatedData
    },
  },
  extraReducers:builder=>{
    builder.addCase(getTodos.pending,(state)=>{
        state.isLoading=state.data.length?false:true
    })
    builder.addCase(getTodos.fulfilled,(state,{payload})=>{
        state.isLoading=false
        state.active = state.active?.length?state.active:payload?.filter((val:TodoListProp)=> !val.completed).map((val:TodoListProp)=> val.id)
        state.data=state.data.length?state.data:payload?.sort((a:TodoListProp, b:TodoListProp) => {
          if (a.completed !== b.completed) {
              return a.completed ? 1 : -1
          } 
      })
    })
    builder.addCase(postTodo.pending,(state)=>{state.isLoading=true})
    builder.addCase(postTodo.fulfilled,(state,{payload})=>{
      state.isLoading=false
      state.data = [...state.data, payload].sort((a,b)=>{
          if (a.completed !== b.completed) {
            return a.completed ? 1 : -1
          } 
          else {
              const dateA = a.date ? new Date(a.date) : null
              const dateB = b.date ? new Date(b.date) : null
              if (!dateA && !dateB) return 0
              if (!dateA) return 1
              if (!dateB) return -1
              return dateA.getTime() - dateB.getTime()
          }
      })
    })
  }
})

// Action creators are generated for each case reducer function
export const { setActive,setDate,setDesc,deleteTdl,setChecked,setBookmark,deleteBookmark,setFilter } = chatSlice.actions

export default chatSlice.reducer