import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        getDashboard : builder.query({
            query : ({subscription_year})=>{
                return{
                   url : `/admin/dashboard?subscription_year=${subscription_year}` ,
                   method : "GET"
                }
            }
        })
    })
})

export const  { useGetDashboardQuery } = dashboardApi; 