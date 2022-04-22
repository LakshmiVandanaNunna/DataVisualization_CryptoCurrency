import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import HomePage from './HomePage';
import Charts from "./Charts";
import React, {useEffect, useState} from "react";
import {CoinSummary} from "../interfaces/CoinSummary";
import {getCoinList} from "../utils/api";
import LoadingIndicator from "../component/LoadingIndicator";
import './TabStyles.css';


function TabsPage() {

  const [coins, setCoins] = useState<CoinSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCoinPage = async () => {
    try {
      setIsLoading(true);
      const coinPage = await getCoinList(1);

      setCoins(coinPage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinPage();
  }, []);

  const tabs = <>
    <div className="tab-container">
    <Tabs>
    <TabList>
      <Tab>Home</Tab>
      <Tab>Compare</Tab>
    </TabList>

    <TabPanel>
      <HomePage coins={coins}/>
      {isLoading && <LoadingIndicator/>}
    </TabPanel>
    <TabPanel>
      <Charts />
    </TabPanel>
  </Tabs>
    </div></>;
  return tabs;
}

export default TabsPage;
