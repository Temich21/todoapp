"use client"

import { updateToDo, updateTasksOrder } from '../../redux/reducers/ToDoSlice'
import { useAppDispatch, useAppSelector } from "../../redux/store"
import React, { useState } from 'react'
import { IToDo } from "../../interfaces/IToDo"
import { Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { IToDoInput } from "../../interfaces/IToDoInput"
import ToDoInputChange from "../ToDoInputChange/ToDoInputChange"
import ToDoTask from "../ToDoTask/ToDoTask"
import { DndContext } from "../../context/DndContext"

import { useGetToDoQuery, useCreateToDoMutation, useUpdateToDoMutation, useDeleteToDoMutation } from '@/app/services/ToDoService'
import { IToDoFetch } from "../../interfaces/IToDoFetch"

const ToDoList: React.FC = () => {
    const dispatch = useAppDispatch()
    const toDoList = useAppSelector(state => state.toDoReducer)

    const [editingId, setEditingId] = useState<string>('')

    const submitEdit = (values: IToDoInput) => {
        dispatch(updateToDo({ ...values, completed: false, visible: true }))
        setEditingId('')
    }

    const startEditing = (id: string) => {
        setEditingId(id)
    }

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        dispatch(updateTasksOrder({
            sourceIndex: result.source.index,
            destinationIndex: result.destination.index
        }))

    }

    //------------------------

    const [Title, setTitle] = useState('')
    const [Text, setText] = useState('')
    const [Time, setTime] = useState('')
    const [Priority, setPriority] = useState('')

    const { data: todos, error, isLoading } = useGetToDoQuery("");
    const [createToDo] = useCreateToDoMutation()
    const [updateToDo] = useUpdateToDoMutation()
    const [deleteToDo] = useDeleteToDoMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const todo: IToDoFetch = {
            id: String(new Date),
            title: Title,
            text: Text,
            time: Time,
            completed: false,
            priority: Priority,
        }

        await createToDo(todo)
    }

    const handleRemove = (e: React.MouseEvent, id: string) => {
        e.stopPropagation()
        deleteToDo(id)
    }

    const handleEdit = (id, completed, time, priority) => {
        const title = prompt()
        const text = prompt()
        updateToDo({ id, title, text, completed, time, priority })
    }

    return (
        <section >
            <DndContext onDragEnd={onDragEnd}>
                <Droppable droppableId="todos">
                    {(provided) => (
                        <ul {...provided.droppableProps} ref={provided.innerRef}>
                            {toDoList.map(({ id, title, text, completed, visible, time, priority }: IToDo, index: number) => {
                                return (
                                    <Draggable key={id} draggableId={id} index={index}>
                                        {(provided) => (
                                            <li
                                                key={id}
                                                className='flex p-2 gap-2 m-2'
                                                style={visible ? {} : { display: 'none' }}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {editingId === id ? (
                                                    <>
                                                        <ToDoInputChange id={id} title={title} text={text} time={time} priority={priority} completed={completed} submitEdit={submitEdit} />
                                                    </>
                                                ) : (
                                                    <>
                                                        <ToDoTask id={id} title={title} text={text} time={time} priority={priority} completed={completed} startEditing={startEditing} />
                                                    </>
                                                )}
                                            </li>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DndContext>

            {toDoList.length === 0 && <div className="text-2xl pl-2">No Tasks!</div>}

            <div>
                <form className="p-2 m-2 border-2 flex flex-col gap-2" onSubmit={(e) => handleSubmit(e)}>
                    <input className="text-black" type="text" value={Title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                    <input className="text-black" type="text" value={Text} placeholder="Text" onChange={(e) => setText(e.target.value)} />
                    <input className="text-black" type="datetime-local" value={Time} onChange={(e) => setTime(e.target.value)} />
                    <select className="text-black" name="priority" value={Priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="Priority 1">Priority 1</option>
                        <option value="Priority 2">Priority 2</option>
                        <option value="Priority 3">Priority 3</option>
                        <option value="Priority 4">Priority 4</option>
                    </select>
                    <button type="submit">Submit To Do</button>
                </form>
                {isLoading && <h1>...Loading</h1>}
                {error && <h1>Error</h1>}
                {todos && todos.map(({ id, title, text, completed, time, priority }: IToDo) => (
                    <div className="p-2 m-2 border-2" key={id}>
                        <h2 onClick={() => handleEdit(id, completed, time, priority)}>{title}</h2>
                        <p>{text}</p>
                        <p>{completed ? "Completed" : "Incompleted"}</p>
                        <p>{time}</p>
                        <p>{priority}</p>
                        <button onClick={(e) => handleRemove(e, id)} className="text-black bg-white w-16" >Delete</button>
                    </div>
                ))}
            </div>

        </section>
    )
}

export default ToDoList