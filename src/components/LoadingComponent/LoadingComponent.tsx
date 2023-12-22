import React from 'react'
import Image from 'next/image'
import style from './LoadingComponent.module.scss'
function LoadingComponent() {
  return (
    <div className={style.loading}><Image src={'/loading.gif'} alt='loading' width={100} height={100} /><span>Loading...</span></div>
  )
}

export default LoadingComponent