import React from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import { IToDoInput } from "../../interfaces/IToDoInput"
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircle, faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { OptionKeys, options } from '../CustomSelectPriority/PriorityConstants'
import CustomSelectPriority from "../CustomSelectPriority/CustomSelectPriority"
import { useAppDispatch } from "../../redux/store"
import { removeFromToDo, comleteOrIncompleteToDo } from '../../redux/reducers/ToDoSlice'

interface IToDoInputChange extends IToDoInput {
    id: string;
    completed: boolean;
    submitEdit: (values: IToDoInput) => void;
}

const ToDoInputChange = React.memo(({ id, title, text, time, priority, completed, submitEdit }: IToDoInputChange) => {
    const dispatch = useAppDispatch()

    return (
        <>
            <div>
                {
                    completed ?
                        <FontAwesomeIcon
                            icon={faCircleCheck} onClick={() => dispatch(comleteOrIncompleteToDo({ id, completed: false }))}
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
            <Formik
                initialValues={{
                    id: id,
                    title: title,
                    text: text,
                    time: time,
                    priority: priority
                }}
                onSubmit={submitEdit}
                validationSchema={Yup.object({
                    title: Yup.string().required("Required")
                })}
            >
                {({
                    setFieldValue,
                    values,
                    errors,
                    touched,
                    submitForm
                }: FormikHelpers<IToDoInput>) => (
                    <Form >
                        <div className='flex justify-between'>
                            <Field
                                name='title'
                                type="text"
                                className='input w-180 text-xl'
                                placeholder="Task title"
                                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && submitForm()}
                            />
                            <div className='flex gap-2'>
                                <FontAwesomeIcon icon={faCheck} onClick={() => submitForm()} />
                                <FontAwesomeIcon icon={faTrashCan} onClick={() => dispatch(removeFromToDo(id))} />
                            </div>
                        </div>
                        {touched.title && errors.title && <div className='text-red-600 font-semibold pl-3.5'>{errors.title}</div>}
                        <Field
                            name='text'
                            as="textarea"
                            className='textarea w-180'
                            placeholder="Describe what needs to be done"
                        />
                        <div className='flex gap-3'>
                            <Field name='time' type='datetime-local' className='input-datetime' />
                            <CustomSelectPriority setPriority={(value: string) => setFieldValue("priority", value)} priorityInput={values.priority} />
                        </div>
                    </Form>
                )}
            </Formik>
        </>

    )
})

export default ToDoInputChange