import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        getBusinessOwner : builder.query({
            query : ({page ,query , type})=>{
                return {
                    url : `/admin/users?type=${type}&page=${page}&limit=10&query=${query}`,
                    method : 'GET'
                }
            },
            providesTags  :["owner"]
        }),
        blockUnblockUser : builder.mutation({
            query  :(data)=>{
                return {
                    url : '/admin/users/toggle-ban',
                    method : "POST",
                    body :  data
                }
            },
            invalidatesTags : ["owner"]
        }),
        deleteUser :  builder.mutation({
            query : (email)=>{
                return {
                    url : `/admin/users?email=${email}`,
                    method : 'DELETE'
                }
            },
            invalidatesTags : ["owner"]

        }),
        addNewBusinessOwner : builder.mutation({
            query : (formData)=>{
                return {
                    url : '/admin/users',
                    method :"POST",
                    body : formData
                }
            },
            invalidatesTags : ["owner"]

        }),
        getSingleUser : builder.query({
            query : (id)=>{
                return {
                    url : `/admin/users/single?id=${id}`,
                    method : 'GET'
                }
            }
        }),

      getCurrency : builder.query({
            query : ()=>{
                return {
                    url : `https://api.frankfurter.app/latest?from=USD`,
                    method : 'GET'
                }
            },
        }),
    })
})

export const { useGetBusinessOwnerQuery , useBlockUnblockUserMutation , useDeleteUserMutation  , useAddNewBusinessOwnerMutation , useGetCurrencyQuery , useGetSingleUserQuery } =  userApi;