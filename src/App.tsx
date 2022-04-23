import { Routes, Route } from 'react-router-dom';
import Page from './component/Page';
import CoinDetailsPage from './pages/CoinDetailsPage';
import TabsPage from './pages/TabsPage';

function App() {
  return (
    <Page>
      <Routes>
        <Route path="/" element={<TabsPage />} />
        <Route path="/:coinId" element={<CoinDetailsPage />} />
      </Routes>
    </Page>
  );
}

export default App;
