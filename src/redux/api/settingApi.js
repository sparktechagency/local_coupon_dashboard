import { baseApi } from "./baseApi";

const settingApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        getFaq  : builder.query({
            query : ()=>{
                return {
                    url : '/legal/faqs',
                    method : "GET"
                }
            },
            providesTags : ['faq']
        }),
        addFaq  : builder.mutation({
            query : (data)=>{
                return {
                    url  :'/admin/legal/faqs',
                    method : "POST",
                    body : data
                }
            },
            invalidatesTags : ['faq']
        }),
        deleteFaq : builder.mutation({
            query : (data)=>{
                return {
                    url : '/admin/legal/faqs',
                    method : 'DELETE',
                    body :  data
                }
            },
            invalidatesTags : ['faq']
        })
    })
})
export const { useGetFaqQuery , useAddFaqMutation , useDeleteFaqMutation } =  settingApi