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
        }
    }),
    updateProfile : builder.mutation({
      query : (data)=>{
        return {
          url : '/profile',
          method : 'PUT',
          body : data
        }
      }
    }),
    changePassword :  builder.mutation({
      query : (data)=>{
        return { 
          url : "/profile/change-password",
          method : 'POST',
          body : data
        }
      }
    })
  }),
});

export const { useLoginAdminMutation, useGetProfileQuery , useUpdateProfileMutation , useChangePasswordMutation } = authApi;
