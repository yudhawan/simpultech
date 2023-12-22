'use client'
import React from 'react'
import { Provider } from 'react-redux'
import {store} from '../../app/store'
import ModelProvider from '../../common/ModelProvider'
export default function AppProvider({children}:{children:React.ReactNode}) {
  return (
    <Provider store={store}>
        <ModelProvider>
            {children}
        </ModelProvider>
    </Provider>
  )
}
