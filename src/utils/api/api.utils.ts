import axios from 'axios';
import { Coin } from '../../interfaces/Coin';
import { CoinChartData } from '../../interfaces/CoinChartData';
import { CoinSummary } from '../../interfaces/CoinSummary';
import { BASE_API_URL, COIN_PAGE_SIZE } from './constants';

export async function getCoinList(page = 1): Promise<CoinSummary[]> {
  const params = `page=${page}&per_page=${COIN_PAGE_SIZE}&vs_currency=usd`;

  const result = await axios.get(`${BASE_API_URL}/coins/markets?${params}`);
  return result.data.splice(0, 8);
}

export async function getCoinDetails(coindId: string): Promise<Coin> {
  const result = await axios.get(`${BASE_API_URL}/coins/${coindId}`);
  return result.data;
}

export async function getCoinChart(coindId: string, days: number | 'max'): Promise<CoinChartData> {
  const params = `days=${days}&vs_currency=usd`;

  const result = await axios.get(`${BASE_API_URL}/coins/${coindId}/market_chart?${params}`);
  return result.data;
}
