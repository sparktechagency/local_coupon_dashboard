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
    })
  }),
});

export const { useLoginAdminMutation, useGetProfileQuery } = authApi;
