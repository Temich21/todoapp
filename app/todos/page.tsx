import Header from "../components/Header/Header"
import ToDoList from "../components/ToDoList/ToDoList"
import ToDoIput from "../components/ToDoInput/ToDoInput"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <ToDoIput />
        <ToDoList />
      </main>
    </>
  )
}
