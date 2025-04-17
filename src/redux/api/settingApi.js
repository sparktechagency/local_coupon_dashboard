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
        }),
        getTernsCondition :  builder.query({
            query : ()=>{
                return { 
                    url : '/legal/terms',
                    method : 'GET'
                }
            },
            providesTags : ["terms"]
        }),
        getPrivacy :  builder.query({
            query : ()=>{
                return { 
                    url : '/legal/privacy',
                    method : 'GET'
                }
            },
            providesTags : ["privacy"]
        }),
        createTermsAndCondition :  builder.mutation({
            query : (data)=>{
                return {
                    url : "/admin/legal/terms",
                    method : 'POST',
                    body : data
                }
            },
            invalidatesTags : ["terms"]
        }),
        createPrivacy :  builder.mutation({
            query : (data)=>{
                return {
                    url : "/admin/legal/privacy",
                    method : 'POST',
                    body : data
                }
            },
            invalidatesTags : ["privacy"]
        }),
    })
})
export const { useGetFaqQuery , useAddFaqMutation , useDeleteFaqMutation , useGetTernsConditionQuery  , useCreateTermsAndConditionMutation , useGetPrivacyQuery , useCreatePrivacyMutation } =  settingApi