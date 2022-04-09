import React from 'react';
import { Coin } from '../../interfaces/Coin';

export const CoinDetailsContext = React.createContext<Coin | null>(null);

export const CoinDetailsProvider = CoinDetailsContext.Provider;
