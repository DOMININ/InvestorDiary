import React, { useState } from "react";
import { useStocks } from "../hooks/useStocks";

const Portfolio: React.FC = () => {
  const [stocksName, setStocksName] = useState<string>("");
  const { request } = useStocks();

  const getData = async () => {
    const response = await request("vtbe");
    setStocksName(response);
  };

  return (
    <div>
      <button onClick={getData}>Найти</button>
      <h1>{stocksName}</h1>
    </div>
  );
};

export default Portfolio;
