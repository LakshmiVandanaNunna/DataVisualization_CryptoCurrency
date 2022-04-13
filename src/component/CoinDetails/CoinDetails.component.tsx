import { Button, CardActions, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Currency } from '../../enums/Currency';
import { Languages } from '../../enums/Languages';
import DataRow from '../DataRow';
import { CoinDetailsProvider } from './CoinDetails.context';
import {
  CoinDetailsCard, CoinDetailsHeader, CoinDetailsImage, CoinDetailsTitle,
} from './CoinDetails.styles';
import CoinDetailTabs from './CoinDetailsTabs';
import { Coin } from '../../interfaces/Coin';
import ChartsTab from "./ChartsTab";

interface CoinDetailsProps {
  coin: Coin;
}

function CoinDetails({ coin }: CoinDetailsProps) {
  const navigate = useNavigate();

  return (
    <CoinDetailsCard>
      <CardContent>
        <CoinDetailsHeader>
          <CoinDetailsImage src={coin.image.thumb} />
          <CoinDetailsTitle>{coin.name}</CoinDetailsTitle>
        </CoinDetailsHeader>

        <DataRow title="Current Price" text={`$${coin.market_data.current_price[Currency.usd]}`} />
        <DataRow title="High 24h" text={`$${coin.market_data.high_24h[Currency.usd]}`} />
        <DataRow title="Low 24h" text={`$${coin.market_data.low_24h[Currency.usd]}`} />

        <CoinDetailsProvider value={coin}>
          <ChartsTab />
        </CoinDetailsProvider>
      </CardContent>

      <CardActions>
        <Button onClick={() => navigate('/')} color="secondary">
          Go back
        </Button>
      </CardActions>
    </CoinDetailsCard>
  );
}

export default CoinDetails;
