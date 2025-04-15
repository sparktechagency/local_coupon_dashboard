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
        })
    })
})

export const { useGetBusinessOwnerQuery , useBlockUnblockUserMutation } =  userApi;