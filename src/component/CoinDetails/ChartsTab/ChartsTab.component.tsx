import { Tabs, Tab } from '@mui/material';
import { useContext, useState } from 'react';
import CoinChart from '../../CoinChart';
import { CoinDetailsContext } from '../CoinDetails.context';
import TabContent from '../TabContent';
import { ChartTabContainer } from './ChartTab.styles';


function ChartsTab() {
  const coin = useContext(CoinDetailsContext);
  const [chartPeriodDays, setChartPeriodDays] = useState<number | 'max'>(1);

  if (!coin) return null;

  return (
    <TabContent>
      <ChartTabContainer>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={chartPeriodDays}
          onChange={(_event, value) => setChartPeriodDays(value)}
          aria-label="Vertical tabs example"
        >
          <Tab label=" 1D " value={1} />
          <Tab label=" 5D " value={5} />
          <Tab label=" 1M " value={30} />
          <Tab label=" 3M " value={90} />
          <Tab label=" 6M " value={180} />
          <Tab label=" 1Y " value={365} />
          <Tab label=" 5Y " value={1862} />
          <Tab label=" MAX  " value="max" />
        </Tabs>

        <CoinChart days={chartPeriodDays} coinId={coin.id} />
      </ChartTabContainer>

    </TabContent>
  );
}

export default ChartsTab;
