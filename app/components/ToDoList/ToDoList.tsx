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

        </section>
    )
}

export default ToDoList