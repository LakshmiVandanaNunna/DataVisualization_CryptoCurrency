import { CoinChartData } from '../../interfaces/CoinChartData';

export const formatDateTime = (integerDate: number) => {
  const [date, time] = new Date(integerDate).toISOString().split('T');
  const splitDate = date.split('-');

  return `${splitDate[1]}/${splitDate[2]}/${splitDate[0]} ${time.substring(0, 5)}`;
};

export const formatChartData = (chartDataPrices: CoinChartData['prices']) => chartDataPrices.map((price) => ({
  date: formatDateTime(price[0]),
  price: price[1],
}));
