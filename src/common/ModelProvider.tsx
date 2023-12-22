'use client'
import React, { useState } from 'react'
import { ModelContext } from './ModelContext'

function ModelProvider({children}:{children:React.ReactNode}) {
    const [isOpen,setIsOpen] = useState(false)
    const [id,setId] = useState('')
    const setStateIsOpen=(val:boolean)=> setIsOpen(val)
    const setStateId=(val:string)=> setId(val)
  return (
    <ModelContext.Provider value={{
        isOpen,
        id,
        setStateIsOpen,
        setStateId
    }}>
        {children}
    </ModelContext.Provider>
  )
}

export default ModelProvider