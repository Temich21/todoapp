'use client'

import React, { useState } from 'react'
import { setAuth } from '@/app/redux/reducers/AuthSlice'
import { useAppDispatch } from "@/app//redux/store"
import { AuthState } from "@/app/redux/reducers/AuthSlice"
import { Formik, Field, Form, FormikHelpers } from 'formik'
import { Persist } from 'formik-persist'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { useGetUsersQuery, useRegistrationMutation } from '@/app/services/AuthService'

const Auth = () => {
    const router = useRouter()
    const { data: users, error, isLoading } = useGetUsersQuery()

    const [userDoesnotExist, userSetDoesnotExist] = useState(false)
    const [userExist, userSetExist] = useState(false)
    const dispatch = useAppDispatch()
    const [registration] = useRegistrationMutation()

    const handleLogin = (values: AuthState) => {
        const found = users.find((user: AuthState) => user.email === values.email && user.password === values.password)

        if (found) {
            dispatch(setAuth(values))
            router.push('/todos')
        } else {
            userSetDoesnotExist(true)
        }

    }

    const handleRegistration = async (values: AuthState) => {
        const found = users.find((user: AuthState) => user.email === values.email && user.password === values.password);

        if (found) {
            userSetExist(true);
        } else {
            try {
                await registration({ id: String(new Date), email: values.email, password: values.password })
            } catch (e) {
                console.log(e)
            }
        }
    };

    return (
        <section className='flex justify-center'>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmit={handleLogin}
                validationSchema={Yup.object({
                    email: Yup.string().email("Invalid email address").required("Required"),
                    password: Yup.string().required("Required")
                })}
            >
                {({
                    errors,
                    touched,
                    submitForm,
                    values
                }: FormikHelpers<AuthState>) => (
                    <Form className='flex flex-col items-center border-2 rounded-md p-2 gap-2 mb-4 w-96'>
                        <Field
                            name='email'
                            type="text"
                            className='input text-xl w-80'
                            placeholder="Your email"
                        />
                        {touched.email && errors.email && <div className='text-red-600 font-semibold pl-3.5'>{errors.email}</div>}
                        {userDoesnotExist && <div className='text-red-600 font-semibold pl-3.5'>User or password are incorrect</div>}
                        {userExist && <div className='text-red-600 font-semibold pl-3.5'>User already exist</div>}
                        <Field
                            name='password'
                            type="password"
                            className='input text-xl w-80'
                            placeholder="Your password"
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && submitForm()}
                        />
                        {touched.password && errors.password && <div className='text-red-600 font-semibold pl-3.5'>{errors.password}</div>}
                        <div className='flex gap-20'>
                            <button type='submit' className='btn'>Login</button>
                            <button type='button' className='btn' onClick={() => handleRegistration(values)}>Registration</button>
                        </div>
                        <Persist
                            name="auth-storage"
                        />
                    </Form>
                )}
            </Formik>
        </section>
    )
}

export default Auth