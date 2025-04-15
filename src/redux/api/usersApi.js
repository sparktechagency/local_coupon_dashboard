import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        getBusinessOwner : builder.query({
            query : ()=>{
                return {
                    url : '/admin/users?type=business&page=1&limit=10',
                    method : 'GET'
                }
            }
        })

    })
})

export const { useGetBusinessOwnerQuery } =  userApi;