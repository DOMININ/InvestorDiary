import React from "react";
import StocksList from "../../Components/StocksList/StocksList";
import NewStock from "../../Components/NewStock/NewStock";

const Portfolio: React.FC = () => {
  return (
    <>
      <NewStock />
      <StocksList />
    </>
  );
};

export default Portfolio;
