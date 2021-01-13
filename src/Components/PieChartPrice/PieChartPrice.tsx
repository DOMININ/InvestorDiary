import React from "react";
import { PieChart, Pie, Tooltip } from "recharts";
import usePieChartSimpleStyles from "./theme";

type ChartProps = {
  stocks: Object[];
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
      />
      <Tooltip />
    </PieChart>
  );
};

export default PieChartPrice;
