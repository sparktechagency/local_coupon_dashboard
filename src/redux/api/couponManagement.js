import { baseApi } from "./baseApi";

const couponManagement = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        getAllCoupon : builder.query({
            query : ()=>{
                return {
                    url : "/coupons?page=1&limit=10",
                    method : "GET"
                }
            }
        }),
        businessAnalytics : builder.query({
            query : ()=>{
                return {
                    url : '/home/analytics',
                    method : 'GET'
                }
            }
        })
    })
})

export const { useGetAllCouponQuery , useBusinessAnalyticsQuery } = couponManagement;