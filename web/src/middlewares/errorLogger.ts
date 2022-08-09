import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';

import { isUnprocessableEntity } from '@features/api/apiSlice';
import { toast } from '@utils/toast';

export const errorLogger: Middleware = () => next => action => {
  const canShowToast =
    isRejectedWithValue(action) && !isUnprocessableEntity(action.payload);

  if (canShowToast) {
    toast({ title: 'Erro', message: action.payload.data.message });
  }

  return next(action);
};
