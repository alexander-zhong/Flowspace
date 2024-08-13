import { apiSlice } from "./apiSlice";
import { Task } from "./authSlice";

const USERS_URL = "/api/users";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),
    fetchtasks: builder.query<Task[], void>({
      query: () => ({
        url: `${USERS_URL}/tasks`,
        method: "GET",
        credentials: "include",
      }),
    }),
    updatetasks: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/tasks`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useFetchtasksQuery,
  useUpdatetasksMutation,
} = usersApiSlice;
