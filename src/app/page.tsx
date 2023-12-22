'use client'
import IconComponent from '../components/icon/icon'
import {SearchIcon} from '../icons'
import style from './page.module.scss'
import FloatButton from '../components/FloatButton/FloatButton'
import { ModelConsumer } from '../common/ModelContext'
import ModalOpen from '../container/ModalOpen/ModalOpen'

export default function Home() {
  return (
    <main className={style.mainContainer}>
      <aside className={style.aside}>
      </aside>
      
      <div className={style.container}>
        <section className={style.searchContainer}>
          <IconComponent name={SearchIcon} />
        </section>
        <section className={style.content}>
          <ModelConsumer>
            {
              ({isOpen,id}:any)=> isOpen?<ModalOpen id={id}/>:<></>
            }
          </ModelConsumer>
          <FloatButton/>
        </section>
      </div>
    </main>
  )
}
