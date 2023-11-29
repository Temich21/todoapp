import { toDoSlice } from "../../redux/reducers/ToDoSlice"
import { setSortDescription, setSortCompleted } from '../../redux/reducers/SortSlice'
import { removeFromToDo, updateToDo, comleteOrIncompleteToDo, updateTasksOrder } from '../../redux/reducers/ToDoSlice'
import { useAppDispatch, useAppSelector } from "../../redux/store"
import React, { useState, useEffect } from 'react'
import { IToDo } from "../../interfaces/IToDo"
import { setEditingId, setTaskTitle, setTaskText, setTaskTimeToDo, setPriority } from '../../redux/reducers/ChangeSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPencil, faCheck, faFlag } from '@fortawesome/free-solid-svg-icons'
import { faCircle, faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { OptionKeys, options } from '../CustomSelectPriority/PriorityConstants'
import CustomSelectPriority from "../CustomSelectPriority/CustomSelectPriority"
import moment from 'moment'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
    const { editingId, titleInput, textInput, timeInput, priorityInput } = useAppSelector(state => state.changeReducer)

    // const sortDescription = useAppSelector(state => state.sortReducer)

    const startEditing = (id: number, title: string, text: string, time: string) => {
        dispatch(setEditingId(id))
        dispatch(setTaskTitle(title))
        dispatch(setTaskText(text))
        dispatch(setTaskTimeToDo(time))
    }

    const submitEdit = () => {
        if (editingId !== null) {
            dispatch(updateToDo({ id: editingId, title: titleInput, text: titleInput, completed: false, visible: true, time: timeInput, priority: priorityInput }))
            dispatch(setEditingId(null))
            dispatch(setTaskTitle(''))
            dispatch(setTaskText(''))
            dispatch(setTaskTimeToDo(''))
        }
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
                    >
                        {editingId === id ? (
                            <>
                                <div>
                                    {
                                        completed ?
                                            <FontAwesomeIcon icon={faCircleCheck} onClick={() => dispatch(comleteOrIncompleteToDo({ id, completed: false }))} style={{ color: options[priority as OptionKeys] }} />
                                            :
                                            <FontAwesomeIcon icon={faCircle} onClick={() => dispatch(comleteOrIncompleteToDo({ id, completed: true }))} style={{ color: options[priority as OptionKeys] }} />
                                    }
                                </div>
                                <div className=''>
                                    <div className='flex justify-between'>
                                        <input
                                            type="text"
                                            value={titleInput}
                                            className='input w-180 text-xl'
                                            onChange={e => dispatch(setTaskTitle(e.target.value))}
                                            onKeyDown={e => e.key === 'Enter' && submitEdit()}
                                        />
                                        <div className='flex gap-2'>
                                            <FontAwesomeIcon icon={faCheck} onClick={() => submitEdit()} />
                                            <FontAwesomeIcon icon={faTrashCan} onClick={() => dispatch(removeFromToDo(id))} />
                                        </div>
                                    </div>
                                    <textarea
                                        value={textInput}
                                        className='textarea w-180'
                                        onChange={e => dispatch(setTaskText(e.target.value))}
                                    />
                                    <div className='flex gap-6'>
                                        <input
                                            type='datetime-local'
                                            value={timeInput}
                                            className='input-datetime'
                                            onChange={e => dispatch(setTaskTimeToDo(e.target.value))}
                                        />
                                        <CustomSelectPriority setPriority={(value: string) => dispatch(setPriority(value))} priorityInput={priorityInput} />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
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
                            </>
                        )}

                    </li>))
                }
            </ul>

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