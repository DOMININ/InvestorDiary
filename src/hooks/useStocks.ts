import { useState } from "react";
import axios, { AxiosResponse } from "axios";

export const useStocks = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<null | []>(null);

  const request = async (ticket: string) => {
    setLoading(true);

    return await axios
      .get(`https://iss.moex.com/iss/securities/${ticket}.json`)
      .then((response: AxiosResponse) => {
        setLoading(false);
        return response.data.description.data[1][2];
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.errors);
          setLoading(false);
          return error.response;
        }
      });
  };

  return { loading, request, error };
};
