"use client"

import { updateToDo } from '../../redux/reducers/ToDoSlice'
import { useAppDispatch, useAppSelector } from "../../redux/store"
import React, { useState } from 'react'
import { IToDo } from "../../interfaces/IToDo"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IToDoInput } from "../../interfaces/IToDoInput"
import ToDoInputChange from "../ToDoInputChange/ToDoInputChange"
import ToDoTask from "../ToDoTask/ToDoTask"

const ToDoList: React.FC = () => {
    const dispatch = useAppDispatch()
    const toDoList = useAppSelector(state => state.toDoReducer)

    const [editingIdBla, setEditingId] = useState<string>('')

    const submitEdit = (values: IToDoInput) => {
        dispatch(updateToDo({ ...values, completed: false, visible: true }))
        setEditingId('')
    }

    const startEditing = (id: string) => {
        setEditingId(id)
    }

    return (
        <section >
            <ul>
                {toDoList.map(({ id, title, text, completed, visible, time, priority }: IToDo, index: number) => (
                    <li
                        key={id}
                        className='flex p-2 gap-2 m-2'
                        style={visible ? {} : { display: 'none' }}
                    >
                        {editingIdBla === id ? (
                            <>
                                <ToDoInputChange id={id} title={title} text={text} time={time} priority={priority} completed={completed} submitEdit={submitEdit} />
                            </>
                        ) : (
                            <>
                                <ToDoTask id={id} title={title} text={text} time={time} priority={priority} completed={completed} startEditing={startEditing} />
                            </>
                        )}
                    </li>))
                }
            </ul>
            {toDoList.length === 0 && <div className="text-2xl pl-2">No Tasks!</div>}
            {/* <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div {...provided.draggableProps} ref={provided.innerRef}>
                            {toDoList.map(({ id, title, text, completed, visible, time, priority }: IToDo, index: number) => (
                                <Draggable key={id} draggableId={id} index={index}>
                                    {(provided) => (
                                        <li
                                            key={id}
                                            ref={provided.innerRef}
                                            className='flex p-2 gap-2 m-2'
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <div>
                                                {
                                                    completed ?
                                                        <FontAwesomeIcon icon={faCircleCheck} onClick={() => dispatch(comleteOrIncompleteToDo({ id, completed: false }))} style={{ color: options[priority as OptionKeys] }} />
                                                        :
                                                        <FontAwesomeIcon icon={faCircle} onClick={() => dispatch(comleteOrIncompleteToDo({ id, completed: true }))} style={{ color: options[priority as OptionKeys] }} />
                                                }
                                            </div>
                                            <div
                                                style={{
                                                    ... (completed ? { textDecoration: 'line-through' } : {}),
                                                }}
                                            >
                                                <div className='flex justify-between'>
                                                    <h3
                                                        className='w-180 font-bold text-xl'

                                                    >{title}</h3>
                                                    <div className='flex gap-2'>
                                                        <FontAwesomeIcon icon={faPencil} className='' onClick={() => startEditing(id, title, text, time, priority)} />
                                                        <FontAwesomeIcon icon={faTrashCan} onClick={() => dispatch(removeFromToDo(id))} />
                                                    </div>
                                                </div>
                                                <p >{text}</p>
                                                <div className='flex gap-6'>
                                                    <div>{moment(time).format('DD-MM-YYYY HH:mm')}</div>
                                                    <div><FontAwesomeIcon icon={faFlag} style={{ color: options[priority as OptionKeys] }} /> {priority}</div>
                                                </div>
                                            </div>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext> */}

        </section>
    )
}

export default ToDoList