import { useState } from "react";
import axios, { AxiosResponse } from "axios";

export const useGetStock = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<null | []>(null);

  const requestStockAPI = async (ticker: string) => {
    setLoading(true);

    const responseName = await axios
      .get(`https://iss.moex.com/iss/securities/${ticker}.json`)
      .then(async (response: AxiosResponse) => {
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

    if (!responseName) {
      return await axios
        .get(
          `http://api.marketstack.com/v1/tickers/${ticker}?access_key=4715cd6eeea3d584dbb0c4ecf62261ec`
        )
        .then((response: AxiosResponse) => {
          setLoading(false);
          return response.data.name;
        });
    }

    return responseName;
  };

  return { loading, requestStockAPI, error };
};
