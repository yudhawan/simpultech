"use client"
import {ContextProps} from '../types'
import React from "react"


export const ModelContext = React.createContext<ContextProps | undefined>(undefined)
export const ModelConsumer = ModelContext.Consumer