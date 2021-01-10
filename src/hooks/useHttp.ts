import { useCallback, useState } from "react";
import axios, { AxiosResponse } from "axios";

export const useHttp = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<null | []>(null);

  const request = useCallback(
    async (
      method: "GET" | "POST" = "GET",
      url: string,
      data: null | object = null,
      headers: null | object = null
    ) => {
      setLoading(true);

      return await axios({
        method,
        url,
        data,
        headers,
      })
        .then((response: AxiosResponse<object>) => {
          setLoading(false);
          return response;
        })
        .catch((error) => {
          if (error.response) {
            setError(error.response.data.errors);
            setLoading(false);
            return error.response;
          }
        });
    },
    []
  );

  return { loading, request, error };
};
