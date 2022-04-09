import { Routes, Route } from 'react-router-dom';
import Page from './component/Page';
import CoinDetailsPage from './pages/CoinDetailsPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Page>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:coinId" element={<CoinDetailsPage />} />
      </Routes>
    </Page>
  );
}

export default App;
