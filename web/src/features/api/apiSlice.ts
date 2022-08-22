import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { AxiosRequestConfig, AxiosError } from 'axios';

import { api, csrf } from '@utils/api';

export const axiosBaseQuery = (): BaseQueryFn<
  {
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
  },
  unknown,
  unknown
> => async ({ url, method, data, params }) => {
  const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

  try {
    await csrf();

    const result = await api({ url: baseUrl + url, method, data, params });

    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError as AxiosError;

    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};

export const apiSlice = createApi({
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  reducerPath: 'api',
  refetchOnFocus: false,
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
