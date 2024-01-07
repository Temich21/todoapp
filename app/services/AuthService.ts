import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AuthState } from "@/app/redux/reducers/AuthSlice"

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => `users`,
            providesTags: result => ['User']
        }),
        registration: builder.mutation({
            query: (user: AuthState) => ({
                url: `users`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        // login: build.query({
        //     query: (user: AuthState) => ({
        //         url: `login`,
        //         method: 'POST',
        //         body: user
        //     })
        // })
    })
})

export const { useGetUsersQuery, useRegistrationMutation } = userAPI