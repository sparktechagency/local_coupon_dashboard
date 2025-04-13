import { baseApi } from "./baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscription: builder.query({
      query: () => {
        return {
          url: "/admin/subscriptions",
          method: "GET",
        };
      },
      providesTags: ["subscription"],
    }),
    createSubscription: builder.mutation({
      query: (data) => {
        return {
          url: "/admin/subscriptions",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["subscription"],
    }),
    updateSubscription: builder.mutation({
      query: (data) => {
        return {
          url: "/admin/subscriptions",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["subscription"],
    }),
    deleteSubscription: builder.mutation({
      query: (id) => {
        return {
          url: "/admin/subscriptions",
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags : ['subscription']

    }),
  }),
});

export const {
  useGetSubscriptionQuery,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
} = subscriptionApi;
