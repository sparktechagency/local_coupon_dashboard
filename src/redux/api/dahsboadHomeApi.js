import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        getDashboard : builder.query({
            query : ()=>{
                return{
                   url : `/admin/dashboard?subscription_year=2025` ,
                   method : "GET"
                }
            }
        })
    })
})

export const  { useGetDashboardQuery } = dashboardApi; 