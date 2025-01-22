import React from "react";
import Plot from "react-plotly.js";

interface LineChartProps {
  title: string;
  xAxisLabel: string;
  yAxisLabel: string;
  categories: string[];
  linesData: {
    label: string;
    color: string;
    data: number[];
  }[];
}

const LineChart: React.FC<LineChartProps> = ({
  title,
  xAxisLabel,
  yAxisLabel,
  categories,
  linesData,
}) => {
  return (
    <Plot
      data={linesData.map((line) => ({
        x: categories,
        y: line.data,
        type: "scatter",
        mode: "lines+markers",
        name: line.label,
        line: { color: line.color },
      }))}
      layout={{
        title: title,
        xaxis: { title: xAxisLabel },
        yaxis: { title: yAxisLabel },
        height: 400,
        width: 600,
      }}
    />
  );
};

export default LineChart;
