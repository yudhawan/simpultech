import { UsersType, chatRoomType, chatsType, stateRedux } from '../types'
import { createSlice,createAsyncThunk, current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export const getUsers = createAsyncThunk('chat/getUsers',async()=>{
  const result = await fetch('https://dummyapi.io/data/v1/user?limit=10',{
    method:'get',
    headers:{
      "Content-Type": "application/json",
      "app-id": "657feacf11111154bcbf1cf4"
    }
  })
  const chats = await result.json()
  if(chats.data.length) return chats?.data
  return []
})


const initialState: stateRedux = {
  isLoading:false,
  search:'',
  users:[],
  selectedChat:{
    id:NaN,
    title:'',
    participants:[],
    messages:[],
  },
  rooms:[
    {
      id:1,
      title:'109220-Naturalization',
      participants:['60d0fe4f5311236168a109ca','60d0fe4f5311236168a109cb','60d0fe4f5311236168a109cc'],
      messages:[
        {
          id: 1,
          sender: "Sara",
          content: "Hi everyone!",
          timestamp: "2023-12-17T15:00:00Z"
        },
        {
          id: 2,
          sender: "Edita",
          content: "Hello David and Eva!",
          timestamp: "2023-12-17T15:05:00Z"
        },
        {
          id: 3,
          sender: "Adina",
          content: "Hi Alice and David!",
          timestamp: "2023-12-17T15:10:00Z"
        }
      ]
    },
    {
      id:2,
      title:'Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]',
      participants:['60d0fe4f5311236168a109cd','60d0fe4f5311236168a109ce','60d0fe4f5311236168a109cf'],
      messages:[
        {
          id: 1,
          sender: "Roberto",
          content: "Hi everyone!",
          timestamp: "2023-12-17T15:00:00Z"
        },
        {
          id: 2,
          sender: "Rudi",
          content: "Hello David and Eva!",
          timestamp: "2023-12-17T15:05:00Z"
        },
        {
          id: 3,
          sender: "Carolina",
          content: "Hi Alice and David!",
          timestamp: "2023-12-17T15:10:00Z"
        }
      ]
    },
    {
      id:3,
      title:'8405-Diana SALAZAR MUNGUIA',
      participants:['60d0fe4f5311236168a109d0','60d0fe4f5311236168a109d1','60d0fe4f5311236168a109d2'],
      messages:[
        {
          id: 1,
          sender: "Emre",
          content: "Hi everyone!",
          timestamp: "2023-12-17T15:00:00Z"
        },
        {
          id: 2,
          sender: "Kent",
          content: "Hello David and Eva!",
          timestamp: "2023-12-17T15:05:00Z"
        },
        {
          id: 3,
          sender: "Evan",
          content: "Hi Alice and David!",
          timestamp: "2023-12-17T15:10:00Z"
        }
      ]
    },
  ]
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSearch: (state, {payload}: PayloadAction<string>) => {
      state.rooms = state.rooms.filter(val=>val.title?.toLocaleLowerCase().includes(payload.toLocaleLowerCase()))
    },
    setChat:(state,{payload}: PayloadAction<number>)=>{
      state.selectedChat=state.rooms.filter(val=>val.id===payload)[0]
    },
    pushChat:(state,{payload}:{payload:{id?:number,data:chatRoomType}})=>{
      const newestMessage = state.rooms.filter(val=>val.id===payload.id)[0]?.['messages'].reduce((prev, current) => {
        return new Date(prev.timestamp) > new Date(current.timestamp) ? prev : current;
      }, {} as chatRoomType);
      const lastId = newestMessage.id
      const newLast = lastId+1
      payload.data.id=newLast
      state.rooms.map(val=>{
        if(val.id===payload.id){
          val.messages.push(payload.data)
        }
      })
    }
  },
  extraReducers(builder) {
    builder.addCase(getUsers.fulfilled,(state,{payload}:PayloadAction<UsersType[]>)=>{
      state.isLoading=false
      state.users=payload
    })
  },
})

// Action creators are generated for each case reducer function
export const { setSearch,setChat,pushChat } = chatSlice.actions

export default chatSlice.reducer