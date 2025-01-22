import React from 'react';
import Plot from 'react-plotly.js';

const LineChart = () => {
  return (
    <Plot
      data={[
        {
          x: ['Confirmed Indian Cases'],
          y: [10039],
          type: 'scatter',
          mode: 'lines',
          name: 'Confirmed Indian Cases',
          line: { shape: 'linear', color: 'blue' },
        },
        {
          x: ['Confirmed Foreign Case'],
          y: [0],
          type: 'scatter',
          mode: 'lines',
          name: 'Confirmed Foreign Case',
          line: { shape: 'linear', color: 'red' },
        },
        {
          x: ['Discharged'],
          y: [9907],
          type: 'scatter',
          mode: 'lines',
          name: 'Discharged',
          line: { shape: 'linear', color: 'green' },
        },
        {
          x: ['Deaths'],
          y: [129],
          type: 'scatter',
          mode: 'lines',
          name: 'Deaths',
          line: { shape: 'linear', color: 'purple' },
        },
      ]}
      layout={{
        title: 'Line Chart',
        xaxis: { title: 'Month' },
        yaxis: { title: 'Values' },
        legend: { orientation: 'h', y: -0.2 },
        margin: { t: 40, l: 50, r: 30, b: 50 },
      }}
      config={{ responsive: true }}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default LineChart;
