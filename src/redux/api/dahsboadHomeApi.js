import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        getDashboard : builder.query({
            query : ({subscription_year , user_year})=>{
                return{
                   url : `/admin/dashboard?subscription_year=${subscription_year}&user_year=${user_year}` ,
                   method : "GET"
                }
            }
        }),
        recentTransaction :  builder.query({
            query : ()=>{
                return {
                    url : `/admin/dashboard/transactions?page=1&limit=10`,
                    method  :'GET'
                }
            }
        })
    })
})

export const  { useGetDashboardQuery , useRecentTransactionQuery } = dashboardApi; 