export type ContextProps = {
    isOpen:boolean,
    id:string,
    setStateIsOpen?:(val:boolean)=>void,
    setStateId?:(val:string)=>void | undefined
}
export type IconProp = {
    name:{src:string},
    className?: string
}
export type chatRoomType={
    id: number,
    sender: string,
    content: string,
    timestamp:string
}
export type RoomType={
    id:number,
    title?:string,
    participants:string[],
    messages:chatRoomType[],
}
export type UsersType={
    id: string,
    title: string,
    firstName: string,
    lastName: string,
    picture: string
}
export type stateRedux = {
    isLoading:boolean,
    search?:string,
    chats?:object[],
    rooms:RoomType[],
    selectedChat?:RoomType
    users?:UsersType[]
}
export type TodosRedux = {
    isLoading:boolean,
    data:TodoListProp[],
    active?:number[]
    filter?:string
}
export type BookmarkProp={
    name:string,
    color:string
}
export type BookmarkInputProp={
    id:number
    bookmark?:BookmarkProp[]
    showTag:number
    setShowTag:(val:number)=>void
    dispatchFn?:(val:BookmarkProp)=>void
    dispatchFnDelete?:(val:BookmarkProp)=>void
    propagation?:boolean
}
export type TodoListProp = {
    id:number,
    title:string,
    userId?:number,
    completed:boolean,
    date:string
    active?:boolean,
    desc?:string,
    bookmark?:BookmarkProp[]
}

export type TimeDivisions={
    amount: number;
    name: Intl.RelativeTimeFormatUnit
}

export type inputType={
    id?:number
    title:string,
    date:string
    desc?:string,
    bookmark?:BookmarkProp[]
}
export type chatsType={
    id:string
    message:string
    publishDate:string
}