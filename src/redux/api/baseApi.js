import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import img from '../../assets/images/place.jpg'

const baseQuery = fetchBaseQuery({
    baseUrl : 'http://134.199.184.239:3002',
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
export const imageUrl = "http://134.199.184.239:3002"
export const placeImage = img 