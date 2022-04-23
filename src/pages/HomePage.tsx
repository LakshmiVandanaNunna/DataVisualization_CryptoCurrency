import CoinList from '../component/CoinList';

function HomePage(props) {
  return (
    <>
      <CoinList coins={props.coins} />
    </>
  );
}

export default HomePage;
