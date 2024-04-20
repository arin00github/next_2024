import { GetResponse } from "@/interface/service";

export const getResponseOK = <T>(props: {
  result: T;
  message: string;
}): GetResponse<T> => {
  return {
    success: true,
    message: props.message,
    result: props.result,
  };
};

export const getResponseError = <T>(props: {
  result: T;
  message: string;
}): GetResponse<T> => {
  return {
    success: false,
    message: props.message,
    result: props.result,
  };
};
