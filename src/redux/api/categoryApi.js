import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        getAllCategory : builder.query({
            query : ()=>{
                return { 
                    url : "/admin/categories",
                    method : 'GET'
                }
            }
        })
    })
})

export const { useGetAllCategoryQuery } = categoryApi;