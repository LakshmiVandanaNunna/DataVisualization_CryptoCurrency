import { useEffect, useMemo, useState } from 'react';
import {
  CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip,
} from 'recharts';
import { CoinChartData } from '../../interfaces/CoinChartData';
import { getCoinChart } from '../../utils/api';
import LoadingIndicator from '../LoadingIndicator';
import { ChartContainer } from './CoinChart.styles';
import { formatChartData } from './CoinChart.utils';

interface CoinChartProps {
  coinId: string;
  days: number | 'max';
}

function CoinChart({ coinId, days }: CoinChartProps) {
  const [coinChartData, setCoinChartData] = useState<CoinChartData>();

  useEffect(() => {
    getCoinChart(coinId, days)
      .then(setCoinChartData);
  }, [coinId, days]);

  const formattedChartData = useMemo(
    () => coinChartData && formatChartData(coinChartData.prices),
    [coinChartData],
  );

  if (!formattedChartData) {
    return (<LoadingIndicator />);
  }

// Line Chart is visualized based on the data
  return (
    <ChartContainer>
      <ResponsiveContainer>
        <LineChart width={800} height={300} data={formattedChartData} margin={{top: 10, right: 30, left: 30, bottom: 40}}>
          <Line type="monotone" dataKey="price" dot={false} stroke="#d884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis fontSize="14" dataKey="date"  />
          <YAxis fontSize="14" dataKey="price"  />
          <Tooltip />
          <Legend />
        </LineChart>
        </ResponsiveContainer>
    </ChartContainer>
  );
}

export default CoinChart;
