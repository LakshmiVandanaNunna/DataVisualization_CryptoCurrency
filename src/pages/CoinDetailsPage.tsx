import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CoinDetails from '../component/CoinDetails';
import LoadingIndicator from '../component/LoadingIndicator';
import { Coin } from '../interfaces/Coin';
import { getCoinDetails } from '../utils/api';

function CoinDetailsPage() {
  const { coinId } = useParams();
  const [coin, setCoin] = useState<Coin>();

  useEffect(() => {
    if (!coinId) return;

    getCoinDetails(coinId)
      .then(setCoin);
  }, [coinId]);

  if (!coin) return <LoadingIndicator />;

  return <CoinDetails coin={coin} />;
}

export default CoinDetailsPage;
