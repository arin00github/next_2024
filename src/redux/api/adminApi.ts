import { CompanyItem, MemberItem, WorkspaceItem } from "@/interface/admin";
import { GetResponse } from "@/interface/service";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/admin" }),
  endpoints: (builder) => ({
    getCompanyByQuery: builder.query<CompanyItem[], null>({
      query: () => `/company`,
      transformResponse: (returnValue: GetResponse<CompanyItem[]>) => {
        // console.log("returnValue", returnValue);
        if (returnValue.success) {
          return returnValue.result;
        }
        return [];
      },
    }),
    getMemberByQuery: builder.query<MemberItem[], null>({
      query: () => `/member`,
      transformResponse: (returnValue: GetResponse<MemberItem[]>) => {
        // console.log("returnValue", returnValue);
        if (returnValue.success) {
          return returnValue.result;
        }
        return [];
      },
    }),
    getMemberDetail: builder.query<MemberItem, null>({
      query: (id) => `/member/${id}`,
    }),
    postCreateMember: builder.mutation({
      query: (params) => ({
        url: "/member",
        method: "POST",
        body: params,
      }),
    }),
    putEditMember: builder.mutation({
      query: (params) => ({
        url: "/member",
        method: "PUT",
        body: params,
      }),
    }),
    getWorkspaceByQuery: builder.query<WorkspaceItem[], null>({
      query: () => `/workspace`,
      transformResponse: (returnValue: GetResponse<WorkspaceItem[]>) => {
        // console.log("returnValue", returnValue);
        if (returnValue.success) {
          return returnValue.result;
        }
        return [];
      },
    }),
    postCreateWorkspace: builder.mutation({
      query: (params) => ({
        url: "/workspace",
        method: "POST",
        body: params,
      }),
    }),
    putEditWorkspace: builder.mutation({
      query: (params) => ({
        url: "/workspace",
        method: "PUT",
        body: params,
      }),
    }),
    postAddMemberToWorkspace: builder.mutation({
      query: (params) => ({
        url: "/workspace/member",
        method: "POST",
        body: params,
      }),
    }),
    deleteMemberFromWorkspace: builder.mutation({
      query: (params) => ({
        url: `/workspace/member`,
        method: "DELETE",
        body: params,
      }),
    }),
    postCreateProject: builder.mutation({
      query: (params) => ({
        url: "/project",
        method: "POST",
        body: params,
      }),
    }),
    putEditProject: builder.mutation({
      query: (params) => ({
        url: "/project",
        method: "PUT",
        body: params,
      }),
    }),
  }),
});

export const { useGetCompanyByQueryQuery } = adminApi;
