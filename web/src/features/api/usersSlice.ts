import { apiSlice } from '@features/api/apiSlice';

interface User {
  id: number;
}

export const usersSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<void, User>({
      query: () => ({ method: 'GET', url: '/user' }),
    }),
  }),
});

export const { useGetUserQuery } = usersSlice;
