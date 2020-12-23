import { useCallback, useState } from "react";
import axios from "axios";

export const useHttp = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<null | []>(null);

  const request = useCallback(
    async (
      method: "GET" | "POST" = "GET",
      url: string,
      data: null | object = null
    ) => {
      setLoading(true);

      await axios({
        method,
        url,
        data,
      }).catch((error) => {
        if (error.response) {
          setError(error.response.data.errors);
          setLoading(false);
        }
      });
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);
  return { loading, request, error, clearError };
};
