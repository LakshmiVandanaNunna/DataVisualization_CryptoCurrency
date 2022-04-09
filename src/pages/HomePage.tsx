import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import CoinList from '../component/CoinList';
import LoadingIndicator from '../component/LoadingIndicator';
import { CoinSummary } from '../interfaces/CoinSummary';
import { getCoinList } from '../utils/api';

function HomePage() {
  const [coins, setCoins] = useState<CoinSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);

  const fetchCoinPage = async () => {
    try {
      setIsLoading(true);
      // const coinPage = await getCoinList(currentPage);
      const coinPage = await getCoinList(1);

      setCoins(coinPage);
      // setCurrentPage(currentPage + 1);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinPage();
  }, []);

  return (
    <>
      <CoinList coins={coins} />
      {isLoading && <LoadingIndicator />}
      {/*{coins.length > 0 && !isLoading && (*/}
      {/*  <Button*/}
      {/*    onClick={fetchCoinPage}*/}
      {/*    variant="contained"*/}
      {/*    color="primary"*/}
      {/*  >*/}
      {/*    Load more*/}
      {/*  </Button>*/}
      {/*)}*/}
    </>
  );
}

export default HomePage;
