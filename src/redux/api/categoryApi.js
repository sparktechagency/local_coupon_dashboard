import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        getAllCategory : builder.query({
            query : ()=>{
                return { 
                    url : "/admin/categories",
                    method : 'GET'
                }
            },
            providesTags : ['category']
        }),
        addCategory :  builder.mutation({
            query : (data)=>{
                return {
                    url : '/admin/categories',
                    method : 'POST',
                    body : data
                }
            },
            invalidatesTags : ["category"]
        }),
        deleteCategory :  builder.mutation({
            query : (id)=>{
                return {
                    url : `/admin/categories?id=${id}`,
                    method : "DELETE"
                }
            },
            invalidatesTags : ["category"]
        }),
        updateCategory :  builder.mutation({
            query : (data)=>{
                return {
                    url : "/admin/categories",
                    method : "PATCH",
                    body : data
                }
            },
            invalidatesTags : ["category"]
        })
    })
})

export const { useGetAllCategoryQuery , useAddCategoryMutation  , useDeleteCategoryMutation , useUpdateCategoryMutation} = categoryApi;