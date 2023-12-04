"use client"

import { useEffect, useRef, useState } from "react"
import styles from './FilterToDo.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders, faFilter, faArrowRightArrowLeft, faArrowsUpDown } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { setSortDescription, setSortCompleted } from '../../redux/reducers/SortSlice'
import { sortToDo, makeVisibleAllToDo, filterByVisibilityToDo } from '../../redux/reducers/ToDoSlice'

const FilterToDo = () => {
    const [isOpen, setIsOpen] = useState(false)

    const dispatch = useAppDispatch()

    const ref = useRef(null)

    const { sortDescription, sortCompleted, sortDirection } = useAppSelector(state => state.sortReducer)

    const changeSortCompletedToDo = (eventKey: string) => {
        switch (eventKey) {
            case 'All':
                dispatch(makeVisibleAllToDo())
                dispatch(setSortCompleted('All'))
                break
            case 'Active':
                dispatch(filterByVisibilityToDo(false))
                dispatch(setSortCompleted('Active'))
                break
            case 'Completed':
                dispatch(filterByVisibilityToDo(true))
                dispatch(setSortCompleted('Completed'))
                break
        }
    }

    const changeSortToDo = (eventKey: string) => {
        dispatch(sortToDo(eventKey))
        dispatch(setSortDescription(eventKey))
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [ref])

    return (
        <div className={styles.customSelectContainer} ref={ref}>
            <div className={styles.selectedOption} onClick={() => setIsOpen(!isOpen)}>
                <FontAwesomeIcon icon={faSliders} />
                View
            </div>
            {isOpen && (
                <div className={styles.optionContainer}>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faFilter} />
                            Sorting by completeness:
                        </div>
                        <select
                            value={sortCompleted}
                            className="cursor-pointer"
                            name="completeness"
                            id="completeness"
                            onChange={(e) => changeSortCompletedToDo(e.target.value)}
                        >
                            <option value="All" className={styles.option}>All</option>
                            <option value="Active" className={styles.option}>Active</option>
                            <option value="Completed" className={styles.option}>Completed</option>
                        </select>

                    </div>
                    <div className="flex justify-between items-center mt-1.5">
                        <div className="flex items-center gap-2"  >
                            <FontAwesomeIcon icon={faArrowRightArrowLeft} rotation={90} />
                            Sorting by:
                        </div>
                        <select
                            value={sortDescription}
                            className="cursor-pointer"
                            name="sorting"
                            id="sorting"
                            onChange={(e) => changeSortToDo(e.target.value)}
                        >
                            <option value="Time Ascending" className={styles.option}>Time</option>
                            <option value="Alphabetical" className={styles.option}>Alphabetical</option>
                            <option value="Unalphabetical" className={styles.option}>Unalphabetical</option>
                            <option value="Priority Ascending" className={styles.option}>Priority</option>
                        </select>
                    </div>
                    {(sortDescription === 'Time Ascending' || sortDescription === 'Time Descending') &&
                        (<div className="flex justify-between items-center mt-1.5">
                            <div className="flex items-center gap-2"  >
                                <FontAwesomeIcon icon={faArrowsUpDown} />
                                Direction:
                            </div>
                            <select
                                value={sortDescription}
                                className="cursor-pointer"
                                name="direction"
                                id="direction"
                                onChange={(e) => changeSortToDo(e.target.value)}
                            >
                                <option value="Time Ascending" className={styles.option}>Ascending</option>
                                <option value="Time Descending" className={styles.option}>Descending</option>
                            </select>
                        </div>)
                    }
                    {(sortDescription === 'Priority Ascending' || sortDescription === 'Priority Descending') &&
                        (<div className="flex justify-between items-center mt-1.5">
                            <div className="flex items-center gap-2"  >
                                <FontAwesomeIcon icon={faArrowsUpDown} />
                                Direction:
                            </div>
                            <select
                                value={sortDescription}
                                className="cursor-pointer"
                                name="direction"
                                id="direction"
                                onChange={(e) => changeSortToDo(e.target.value)}
                            >
                                <option value="Priority Ascending" className={styles.option}>Ascending</option>
                                <option value="Priority Descending" className={styles.option}>Descending</option>
                            </select>
                        </div>)
                    }
                </div>
            )}
        </div>
    )
}

export default FilterToDo