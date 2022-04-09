import { useState } from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import StarIcon from '@mui/icons-material/Star';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Tabs, Tab } from '@mui/material';
import ChartsTab from '../ChartsTab';

enum TabOption {
  charts
}

function CoinDetailTabs() {
  const [tab, setTab] = useState(TabOption.charts);

  return (
    <>
      <Tabs
        value={tab}
        onChange={(_event, newValue) => setTab(newValue)}
        aria-label="Coin details tab"
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >

        <Tab icon={<BarChartIcon />} label="Charts" />
      </Tabs>

      { tab === TabOption.charts && <ChartsTab /> }
    </>
  );
}

export default CoinDetailTabs;
