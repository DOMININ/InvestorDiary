import React, { useCallback, useContext, useEffect, useState } from "react";
import PieChartSimple from "../../Components/PieChart/PieChartSimple";
import { useHttp } from "../../hooks/useHttp";
import { AuthContext } from "../../context/AuthContext";

const Portfolio: React.FC = () => {
  const [stocks, setStocks] = useState<any[]>([]);
  const { request } = useHttp();
  const { token } = useContext(AuthContext);

  const containsObject = (obj: any, list: any) => {
    for (let i = 0; i < list.length; i++) {
      if (JSON.stringify(list[i].ticker) === JSON.stringify(obj.ticker)) {
        return true;
      }
    }

    return false;
  };

  const sumStocks = useCallback((stocks: []) => {
    let iterObj: any;
    let arrObj: any[] = [];
    let newStocks = [...stocks];

    for (iterObj of newStocks) {
      delete iterObj["date"];
      if (containsObject(iterObj, arrObj)) {
        for (let i = 0; i < arrObj.length; i++) {
          if (
            JSON.stringify(arrObj[i].ticker) === JSON.stringify(iterObj.ticker)
          ) {
            arrObj[i].price += iterObj.price;
            arrObj[i].qty += iterObj.qty;
          }
        }
      } else {
        arrObj = [...arrObj, iterObj];
      }
    }

    for (let iterObj of arrObj) {
      if (containsObject(iterObj, arrObj)) {
        let countIdentical = newStocks.filter(
          (obj: any) =>
            JSON.stringify(obj.ticker) === JSON.stringify(iterObj.ticker)
        );
        for (let i = 0; i < arrObj.length; i++) {
          if (
            JSON.stringify(arrObj[i].ticker) === JSON.stringify(iterObj.ticker)
          ) {
            arrObj[i].price = +(
              arrObj[i].price / countIdentical.length
            ).toFixed(2);
          }
        }
      }
    }
    setStocks(arrObj);
  }, []);

  const fetchStocks = useCallback(async () => {
    try {
      const fetched = await request("GET", "api/stock", null, {
        authorization: `Bearer ${token}`,
      });

      sumStocks(fetched.data);
    } catch (e) {}
  }, [request, sumStocks, token]);

  useEffect(() => {
    fetchStocks();
  }, [fetchStocks]);

  return (
    <>
      <PieChartSimple stocks={stocks} />
    </>
  );
};

export default Portfolio;
