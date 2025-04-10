import { baseApi } from "./baseApi";

const authApi =  baseApi.injectEndpoints({
    endpoints : (builder)=>({
       loginAdmin  : builder.mutation({
        query : (data)=>{
            return {
                url : '/auth/login',
                method : 'POST',
                body : data
            }
        }
       })
    })
})

export const  { useLoginAdminMutation } = authApi;