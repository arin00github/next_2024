import { LangDataItem, ResultItem } from "@/interface/dbquery";
import { ResourceItem } from "@/interface/resource";
import { GetResponse } from "@/interface/service";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const dbqueryApi = createApi({
  reducerPath: "dbqueryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/dbquery" }),
  endpoints: (builder) => ({
    getQueryData: builder.query<ResultItem[], null>({
      query: () => ``,
      transformResponse: (returnValue: GetResponse<ResultItem[]>) => {
        // console.log("returnValue", returnValue);
        if (returnValue.success) {
          return returnValue.result;
        }
        return [];
      },
    }),
    postAddData: builder.mutation({
      query: () => ({
        url: ``,
        method: "POST",
      }),
    }),
  }),
});

export const { useGetQueryDataQuery, usePostAddDataMutation } = dbqueryApi;
