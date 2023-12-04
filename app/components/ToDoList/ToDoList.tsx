"use client"

import { toDoSlice } from "../../redux/reducers/ToDoSlice"
import { setSortDescription, setSortCompleted } from '../../redux/reducers/SortSlice'
import { updateToDo } from '../../redux/reducers/ToDoSlice'
import { useAppDispatch, useAppSelector } from "../../redux/store"
import React, { useState } from 'react'
import { IToDo } from "../../interfaces/IToDo"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IToDoInput } from "../../interfaces/IToDoInput"
import ToDoInputChange from "../ToDoInputChange/ToDoInputChange"
import ToDoTask from "../ToDoTask/ToDoTask"

const ToDoList: React.FC = () => {
    // const [completeExisting, setCompleteExisting] = useState<boolean>(false)

    // const {
    //     filterByVisibilityToDo,
    //     makeVisibleAllToDo,
    //     removeAllCompleteToDo,
    //     sortToDo,
    // } = toDoSlice.actions

    const dispatch = useAppDispatch()
    const toDoList = useAppSelector(state => state.toDoReducer)

    // const sortDescription = useAppSelector(state => state.sortReducer)

    const [editingIdBla, setEditingId] = useState<string>('')

    const submitEdit = (values: IToDoInput) => {
        dispatch(updateToDo({ ...values, completed: false, visible: true }))
        setEditingId('')
    }

    const startEditing = (id: string) => {
        setEditingId(id)
    }

    // const handleOnDragEnd = (result) => {
    //     if (!result.destination) return;
    //     console.log(result.source.index, result.destination.index)
    //     dispatch(updateTasksOrder({
    //         sourceIndex: result.source.index,
    //         destinationIndex: result.destination.index
    //     }))
    // }

    // Funkce pro zmenu sortirovani a ulozeni vybranneho stavu do storu
    // const changeSortToDo = (eventKey: string | null) => {
    //     if (eventKey) {
    //         dispatch(sortToDo(eventKey))
    //         switch (eventKey) {
    //             case 'time':
    //                 dispatch(setSortDescription('Time'))
    //                 break
    //             case 'additionOrder':
    //                 dispatch(setSortDescription('Addition Order'))
    //                 break
    //             case "alphabetical":
    //                 dispatch(setSortDescription('Alphabetical'))
    //                 break
    //             case "unalphabetical":
    //                 dispatch(setSortDescription('Unalphabetical'))
    //                 break
    //         }
    //     }
    // }

    // Funkce pro filtrace dle aktualnosti
    // const changeSortCompletedToDo = (sortCompleted: string) => {
    //     switch (sortCompleted) {
    //         case 'All':
    //             dispatch(makeVisibleAllToDo())
    //             dispatch(setSortCompleted('All'))
    //             break
    //         case 'Active':
    //             dispatch(filterByVisibilityToDo(false))
    //             dispatch(setSortCompleted('Active'))
    //             break
    //         case 'Completed':
    //             dispatch(filterByVisibilityToDo(true))
    //             dispatch(setSortCompleted('Completed'))
    //             break
    //     }
    // }

    // useEffect(() => {
    //     const hasCompleted = toDoList.some(todo => todo.completed)
    //     setCompleteExisting(hasCompleted)
    // }, [toDoList])

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

            {/* {toDoList.length ?
                <ul className={styles.tasks}>
                    {toDoList.map(({ id, task, completed, visible, time }, index) => (
                        <li
                            key={id}
                            className={styles.task}
                            style={visible ? {} : { display: 'none' }}
                        >
                            <div className={styles.taskContent} >
                                {
                                    editingId === id ? (
                                        <>
                                            <div className={styles.taskText}>
                                                {
                                                    completed ?
                                                        <FontAwesomeIcon icon={faCircleCheck} onClick={() => dispatch(comleteOrIncompleteToDo({ id, completed: false }))} />
                                                        :
                                                        <FontAwesomeIcon icon={faCircle} onClick={() => dispatch(comleteOrIncompleteToDo({ id, completed: true }))} />
                                                }
                                                <input
                                                    type="text"
                                                    value={editingText}
                                                    onChange={e => setEditingText(e.target.value)}
                                                    onKeyDown={e => e.key === 'Enter' && submitEdit()}
                                                />
                                            </div>

                                            <input
                                                type="datetime-local"
                                                value={editingTime}
                                                onChange={e => setEditingTime(e.target.value)}
                                                className={styles.taskTime}
                                            />
                                        </>

                                    ) : (
                                        <>
                                            <div className={styles.taskText}
                                                style={{
                                                    ... (completed ? { textDecoration: 'line-through' } : {}),
                                                    ... (visible ? {} : { display: 'none' })
                                                }}
                                            >
                                                {
                                                    completed ?
                                                        <FontAwesomeIcon icon={faCircleCheck} onClick={() => dispatch(comleteOrIncompleteToDo({ id, completed: false }))} />
                                                        :
                                                        <FontAwesomeIcon icon={faCircle} onClick={() => dispatch(comleteOrIncompleteToDo({ id, completed: true }))} />
                                                }
                                                {task}
                                            </div>
                                            <div className={styles.taskTime}
                                                style={completed ? { textDecoration: 'line-through' } : {}}
                                            >
                                                {isNaN(Number(readableTimeConverter(time)[0])) ? '-' : readableTimeConverter(time)}
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                            <div className={styles.icons}>
                                <FontAwesomeIcon icon={faTrashCan} className={styles.icon} onClick={() => dispatch(removeFromToDo(index))} />
                                {
                                    editingId === id ?
                                        <FontAwesomeIcon icon={faCheck} className={styles.icon} onClick={() => submitEdit()} />
                                        :
                                        <FontAwesomeIcon icon={faPencil} className={styles.icon} onClick={() => startEditing(id, task, time)} />
                                }
                            </div>
                        </li>
                    ))}
                </ul> :
                <div className={styles.noTasks}>No tasks!</div>
            }
            <div className={styles.sortBar}>
                <div className={styles.completedBar}>
                    <ul className={styles.completedBarSort}>
                        <li
                            style={sortDescription.sortCompleted === 'All' ? { border: 'solid 1px', borderRadius: '0.5rem' } : {}}
                            onClick={() => changeSortCompletedToDo('All')}
                        >
                            All
                        </li>
                        <li
                            style={sortDescription.sortCompleted === 'Active' ? { border: 'solid 1px', borderRadius: '0.5rem' } : {}}
                            onClick={() => changeSortCompletedToDo('Active')}
                        >
                            Active
                        </li>
                        <li
                            style={sortDescription.sortCompleted === 'Completed' ? { border: 'solid 1px', borderRadius: '0.5rem' } : {}}
                            onClick={() => changeSortCompletedToDo('Completed')}>
                            Completed
                        </li>
                    </ul>
                    {
                        completeExisting &&
                        <div onClick={() => dispatch(removeAllCompleteToDo())}>Clear completed</div>
                    }
                </div>
                <div className={styles.taskSort}>
                        <label>Sort by:</label>
                        <Dropdown onSelect={changeSortToDo} >
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className={styles.taskSortList}>
                                {sortDescription.sortDescription}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="time">Time</Dropdown.Item>
                                <Dropdown.Item eventKey="additionOrder">Addition order</Dropdown.Item>
                                <Dropdown.Item eventKey="alphabetical">Alphabetical</Dropdown.Item>
                                <Dropdown.Item eventKey="unalphabetical">Unalphabetical</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
            </div> */}
        </section>
    )
}

export default ToDoList