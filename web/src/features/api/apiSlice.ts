import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: headers => {
      headers.set('accept', 'application/json');

      return headers;
    },
  }),
  endpoints: () => ({}),
  reducerPath: 'api',
  refetchOnFocus: false,
  tagTypes: ['User'],
});

interface ErrorWithResponse {
  data: {
    message: string;
  };
  status: number;
}

interface ErrorResponseWithErrors extends ErrorWithResponse {
  data: {
    errors: {
      [error: string]: string[];
    };
    message: string;
  };
}

export const isErrorWithResponse = (
  error: unknown,
): error is ErrorWithResponse =>
  typeof error === 'object' &&
  error !== null &&
  'data' in error &&
  'status' in error;

export const isErrorResponseWithErrors = (
  error: unknown,
): error is ErrorResponseWithErrors =>
  isErrorWithResponse(error) && 'errors' in error.data;

const isErrorResponseUnprocessableEntity = (error: ErrorWithResponse) =>
  error.status === 422;

export const isUnprocessableEntity = (
  error: unknown,
): error is ErrorResponseWithErrors =>
  isErrorWithResponse(error) && isErrorResponseUnprocessableEntity(error);

export const getMessageFrom = (error: unknown, defaultMessage: string) =>
  isErrorWithResponse(error) && !isErrorResponseUnprocessableEntity(error)
    ? error.data.message
    : defaultMessage;
