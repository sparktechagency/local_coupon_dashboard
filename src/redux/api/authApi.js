import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginAdmin: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },
    }),
    getProfile :  builder.query({
        query : ()=>{
            return {
                url : "/profile",
                method : 'GET'
            }
        },
        providesTags : ['profile']
    }),
    updateProfile : builder.mutation({
      query : (data)=>{
        return {
          url : '/profile',
          method : 'PUT',
          body : data
        }
      },
      invalidatesTags : ["profile"]
    }),
    changePassword :  builder.mutation({
      query : (data)=>{
        return { 
          url : "/profile/change-password",
          method : 'POST',
          body : data
        }
      }
    }),
    getNotification : builder.query({
      query :  ()=>{
        return { 
          url : '/admin/dashboard/notifications',
          method : 'GET'
        }
      }
    }),
    getNotificationCount  : builder.query({
      query : ()=>{
        return {
          url : '/admin/dashboard/notifications?count=true',
          method : 'GET'
        }
      }
    }),
    forgetPassword :  builder.mutation({
      query : (data)=>{
        return {
          url : '/auth/forgot-password',
          method : 'POST',
          body : data
        }
      }
    }),
    verifyOtp :  builder.mutation({
      query : (data)=>{
        return {
          url : '/auth/verify-otp',
          method : 'POST',
          body : data
        }
      }
    }),
  }),
});

export const { useLoginAdminMutation, useGetProfileQuery , useUpdateProfileMutation , useChangePasswordMutation  , useGetNotificationQuery , useGetNotificationCountQuery , useForgetPasswordMutation , useVerifyOtpMutation} = authApi;
