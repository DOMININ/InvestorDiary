import React from "react";
import { PieChart, Pie, Tooltip } from "recharts";
import { Container, Paper } from "@material-ui/core";
import usePieChartSimpleStyles from "./theme";

type ChartProps = {
  stocks: Object[];
};

const PieChartSimple: React.FC<ChartProps> = ({ stocks }) => {
  const classes = usePieChartSimpleStyles();
  return (
    <Paper>
      <Container>
        <PieChart width={400} height={400} className={classes.pieChart}>
          <Pie
            dataKey="qty"
            isAnimationActive={false}
            data={stocks}
            outerRadius={130}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </Container>
    </Paper>
  );
};

export default PieChartSimple;
