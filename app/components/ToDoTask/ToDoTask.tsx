import { removeFromToDo, comleteOrIncompleteToDo } from '../../redux/reducers/ToDoSlice'
import { useAppDispatch } from "../../redux/store"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPencil, faFlag } from '@fortawesome/free-solid-svg-icons'
import { faCircle, faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { OptionKeys, options } from '../CustomSelectPriority/PriorityConstants'
import moment from 'moment'
import { IToDoInput } from "../../interfaces/IToDoInput"

interface IToDoTask extends IToDoInput {
    id: string;
    completed: boolean;
    startEditing: (id: string) => void;
}

const ToDoTask = ({ id, title, text, time, priority, completed, startEditing }: IToDoTask) => {
    const dispatch = useAppDispatch()

    return (
        <>
            <div>
                {
                    completed ?
                        <FontAwesomeIcon
                            icon={faCircleCheck}
                            onClick={() => dispatch(comleteOrIncompleteToDo({ id, completed: false }))}
                            style={{ color: options[priority as OptionKeys] }}
                        />
                        :
                        <FontAwesomeIcon
                            icon={faCircle}
                            onClick={() => dispatch(comleteOrIncompleteToDo({ id, completed: true }))}
                            style={{ color: options[priority as OptionKeys] }}
                        />
                }
            </div>
            <div
                style={{
                    ... (completed ? { textDecoration: 'line-through', textDecorationColor: options[priority as OptionKeys], textDecorationThickness: '2px' } : {}),
                }}
            >
                <div className='flex justify-between'>
                    <h3
                        className='w-180 font-bold text-xl'

                    >{title}</h3>
                    <div className='flex gap-2'>
                        <FontAwesomeIcon icon={faPencil} className='' onClick={() => startEditing(id)} />
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
    )
}

export default ToDoTask