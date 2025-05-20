import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import img from '../../assets/images/place.jpg'

const baseQuery = fetchBaseQuery({
    // baseUrl : 'http://10.0.60.129:3002',
    baseUrl : 'https://api.impactoapps.com',
    prepareHeaders  :  (headers)=>{
        const token = JSON.parse(localStorage.getItem('coupon_token'));
        if(token){
            headers.set('Authorization' , `Bearer ${token}`)
        }
        return headers
    }
})

export const baseApi = createApi({
    reducerPath : 'baseApi',
    baseQuery : baseQuery,
    endpoints : ()=>({})
})
// export const imageUrl = "http://10.0.60.129:3002"
export const imageUrl = "https://api.impactoapps.com"
export const placeImage = img 