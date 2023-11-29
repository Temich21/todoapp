"use client" //????

import Header from "./components/Header/Header"
import ToDoList from "./components/ToDoList/ToDoList"
import ToDoIput from "./components/ToDoInput/ToDoInput"
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'

export default function Home() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <main className=''>
            <ToDoIput />
            <ToDoList />
          </main>
        </PersistGate>
      </Provider>
    </>
  )
}
