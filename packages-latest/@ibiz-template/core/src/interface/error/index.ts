import { AxiosResponse } from 'axios';

export type InputError = {
  message: string;
  response?: AxiosResponse;
};

export type detailMessage = {
  name: string;
  logicName: string;
  errorType: number;
  errorInfo: string;
};
