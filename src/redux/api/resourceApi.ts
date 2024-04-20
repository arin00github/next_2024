// Need to use the React-specific entry point to import createApi
import { ResourceItem } from "@/interface/resource";
import { GetResponse } from "@/interface/service";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const resourceApi = createApi({
  reducerPath: "resourceApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/resource" }),
  endpoints: (builder) => ({
    getResource: builder.query<ResourceItem[], string>({
      query: (name) => `?resourceType=${name}`,
      transformResponse: (returnValue: GetResponse<ResourceItem[]>) => {
        console.log("returnValue", returnValue);
        if (returnValue.success) {
          return returnValue.result;
        }
        return [];
      },
    }),
    postUploadImage: builder.mutation({
      query: (form: FormData) => ({
        url: `/image`,
        method: "POST",
        body: form,
      }),
    }),
    postUploadAudio: builder.mutation({
      query: (body) => ({
        url: `/audio`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetResourceQuery,
  usePostUploadAudioMutation,
  usePostUploadImageMutation,
} = resourceApi;
