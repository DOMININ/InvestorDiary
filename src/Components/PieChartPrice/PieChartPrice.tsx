import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import usePieChartSimpleStyles from "./theme";

type ChartProps = {
  stocks: Object[];
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const PieChartPrice: React.FC<ChartProps> = ({ stocks }) => {
  const classes = usePieChartSimpleStyles();

  return (
    <PieChart width={400} height={400} className={classes.pieChart}>
      <Pie
        dataKey="price"
        isAnimationActive={false}
        data={stocks}
        outerRadius={130}
        fill="#8884d8"
        label
      >
        {stocks.map((entry: object, index: number) => (
          <Cell key={`cell-${index}`} fill={getRandomColor()} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default PieChartPrice;
