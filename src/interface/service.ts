export interface GetResponse<T> {
  success: boolean;
  message: string;
  result: T;
}
