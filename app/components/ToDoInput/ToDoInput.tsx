'use client'

import React from 'react'
import CustomSelectPriority from '../CustomSelectPriority/CustomSelectPriority'
import { addToDo } from '../../redux/reducers/ToDoSlice'
import { useAppDispatch } from "../../redux/store"
import { IToDo } from "../../interfaces/IToDo"
import { IToDoInput } from "../../interfaces/IToDoInput"
import { v4 as uuidv4 } from 'uuid'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import { Persist } from 'formik-persist'
import * as Yup from 'yup'

const ToDoInput: React.FC = () => {
    const dispatch = useAppDispatch()

    const submit = (values: IToDoInput) => {
        const data: IToDo = {
            ...values,
            id: uuidv4(),
            completed: false,
            visible: true
        }
        dispatch(addToDo(data))
    }

    return (
        <section >
            <Formik
                initialValues={{
                    title: '',
                    text: '',
                    time: '',
                    priority: 'Priority 4'
                }}
                onSubmit={submit}
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
                    <Form className='flex flex-col border-2 rounded-md p-2 gap-2 mb-4'>
                        <Field
                            name='title'
                            type="text"
                            className='input text-xl'
                            placeholder="Task title"
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && submitForm()}
                        />
                        {touched.title && errors.title && <div className='text-red-600 font-semibold pl-3.5'>{errors.title}</div>}
                        <Field name='text' as="textarea" className='textarea' placeholder="Describe what needs to be done" />
                        <div className='flex justify-between'>
                            <div className='flex gap-3'>
                                <Field name='time' type='datetime-local' className='input-datetime' />
                                <CustomSelectPriority setPriority={(value: string) => setFieldValue("priority", value)} priorityInput={values.priority} />
                            </div>
                            <div className='flex gap-3'>
                                <button type='reset' className='btn-cancel'>Clear</button>
                                <button type='submit' className='btn'>Add task</button>
                            </div>
                        </div>
                        <Persist
                            name="input-storage"
                        />
                    </Form>
                )}
            </Formik>
        </section>
    )
}

export default ToDoInput