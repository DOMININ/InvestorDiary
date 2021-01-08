import React from "react";
import StocksList from "../../Components/StocksList/StocksList";
import NewStock from "../../Components/NewStock/NewStock";
import StockInfo from "../../Components/StockInfo/StockInfo";

const Portfolio: React.FC = () => {
  return (
    <>
      <NewStock />
      <StockInfo />
      <StocksList />
    </>
  );
};

export default Portfolio;
