export type ResponseApi<T> = {
  error: boolean;
  sucess: boolean;
  data: T;
  message: string | null;
};
