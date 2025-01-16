import { Chart } from 'react-google-charts';
import React from 'react';

interface PieChartProps {
  inProgressGoals: [];
  finishedGoals: [];
}

const PieChart: React.FC<PieChartProps> = ({
  inProgressGoals,
  finishedGoals,
}) => {
  const data = [
    ['Task', 'Goals'],
    ['In Progress Goals', inProgressGoals.length],
    ['Finished Goals', finishedGoals.length],
  ];

  const options = {
    // title: "My goals status",
    legend: { position: 'bottom' },
    backgroundColor: '#eaeef4',
    pieHole: 0.4,
  };

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={'100%'}
      height={'400px'}
    />
  );
};

export default PieChart;
