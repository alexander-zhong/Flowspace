import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "flowspaceapi-ca5xg1oqm-alexander-zhongs-projects.vercel.app",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: () => ({}),
});
