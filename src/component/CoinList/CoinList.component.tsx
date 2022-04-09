import { Link } from 'react-router-dom';
import { CoinSummary } from '../../interfaces/CoinSummary';
import { CoinGrid } from './CoinList.styles';
import CoinListItem from './CoinListItem';

interface CoinListProps {
  coins: CoinSummary[];
}

function CoinList({ coins }: CoinListProps) {
  return (
    <CoinGrid>
      {
        coins.map((coin) => (
            <Link role="button" to={coin.id} key={coin.id}>
              <CoinListItem coin={coin} />
            </Link>
        ))
      }
    </CoinGrid>
  );
}

export default CoinList;
