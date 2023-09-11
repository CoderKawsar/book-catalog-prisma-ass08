import { IGenericErrorMessage } from "./error";

export type IMeta = {
  page: number;
  size: number;
  total: number;
  totalPage: number;
};

export type IGenericResponse<T> = {
  meta: IMeta;
  data: T;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};
