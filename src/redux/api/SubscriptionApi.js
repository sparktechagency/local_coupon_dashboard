import { baseApi } from "./baseApi";

const subscriptionApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        getSubscription  : builder.query({
            query : ()=>{
                return {
                    url : '/admin/subscriptions',
                    method : 'GET'
                }
            }
        })
    })
})

export const { useGetSubscriptionQuery } = subscriptionApi