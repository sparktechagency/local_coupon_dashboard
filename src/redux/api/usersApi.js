import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        getBusinessOwner : builder.query({
            query : ()=>{
                return {
                    url : '/admin/users?type=business&page=1&limit=10',
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