import axios from 'axios';
import * as APIUtils from '.';
import { BASE_API_URL } from './constants';

test('Should get coin list', () => {
  const axiosSpy = jest.spyOn(axios, 'get');

  APIUtils.getCoinList();
  expect(axiosSpy).toHaveBeenCalledWith(`${BASE_API_URL}/coins/markets?vs_currency=usd&page=1&per_page=20`);
});

test('Should get coin details', () => {
  const axiosSpy = jest.spyOn(axios, 'get');

  const mockCoinId = '123';

  APIUtils.getCoinDetails(mockCoinId);
  expect(axiosSpy).toHaveBeenCalledWith(`${BASE_API_URL}/coins/${mockCoinId}`);
});
