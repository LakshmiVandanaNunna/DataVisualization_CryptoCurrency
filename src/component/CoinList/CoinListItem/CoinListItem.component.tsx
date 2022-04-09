import { CardContent } from '@mui/material';
import { useState } from 'react';
import {
  CoinTitle, CoinImage, CoinCard, CoinImageContainer,
} from './CoinListItem.styles';
import { CoinSummary } from '../../../interfaces/CoinSummary';
import DataRow from '../../DataRow';

interface CoinListItemProps {
  coin: CoinSummary;
}

function CoinListItem({ coin }: CoinListItemProps) {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleOnMouseOver = () => setIsMouseOver(true);
  const handleOnMouseOut = () => setIsMouseOver(false);

  return (
    <CoinCard
      elevation={isMouseOver ? 4 : 1}
      onMouseOver={handleOnMouseOver}
      onMouseOut={handleOnMouseOut}
    >
      <CardContent>
        <CoinImageContainer>
          <CoinImage src={coin.image} alt={`${coin.name} image`} />
        </CoinImageContainer>

        <CoinTitle>{`(${coin.symbol}) ${coin.name}`}</CoinTitle>
      </CardContent>
    </CoinCard>
  );
}

export default CoinListItem;
