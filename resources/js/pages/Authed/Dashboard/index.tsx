import React, { useEffect } from 'react';
import { Grid, SimpleGrid, Text, Title } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';

import { setTitle } from 'Redux/layout';
import Stat from 'Components/Widgets/Stat';
import PnLByStrategy from './Widgets/PnLByStrategy';
import BalanceBreakdown from './Widgets/BalanceBreakdown';
import RecentlyClosedPositions from './Widgets/RecentlyClosedPositions';
import OpenPositions from './Widgets/OpenPositions';
import TopSellingProducts from './Widgets/TopSellingProducts';
import BootCampCompletion from './Widgets/BootCampCompletion';
import ExchangeAccountBalances from './Widgets/ExchangeAccountBalances';
import ProfitByExchange from './Widgets/ProfitByExchange';
import TotalSales from './Widgets/TotalSales';
import OverallPnL from './Widgets/OverallPnL';

const Dashboard = () => {
    const dispatch = useDispatch();
    const userStore = useSelector((state: any) => state.user);

    useEffect(() => {
        dispatch(setTitle('Dashboard'));


    }, []);

    // dashboard widgets
    // <Grid columns={24}>
    //     <Grid.Col span={12}>
    //         <Title order={3}>Dashboard</Title>
    //     </Grid.Col>
    // </Grid>

    return (
        <div className="dashboard">
            {/* <Text size="xl" style={{marginBottom: 12}} color={'grey'}>Welcome back, {userStore.user.metadata.name}</Text> */}

            <SimpleGrid cols={4}>
                {/* Total sales (defaults to this month) */}
                <TotalSales />

                {/* Total scripts for sale (defaults to this month) */}
                {/* <Stat icon="money" title="Scripts for sale" value="12" diff={24} subtext="Compared to previous month" /> */}

                {/* Balance (total balance of all accounts and expenses, balance each connected exchange account) (defaults to this month) */}
                <BalanceBreakdown />

                {/* Overall P/L (profit/lose calculated with strategies used) (defaults to this month) */}
                {/* <Stat icon="coin" title="Overall P/L" value="$1,456.00" diff={34} subtext="Compared to previous month" /> */}
                <OverallPnL />

                {/* Competion percent of boot camp (defaults to this month) */}
                {/* <Stat icon="coin" title="Boot Camp complete" value="$1,456.00" diff={-34} subtext="Compared to previous month" /> */}
                <BootCampCompletion />
            </SimpleGrid>

            {/* <SimpleGrid cols={1}>
            </SimpleGrid> */}

            <SimpleGrid cols={2} style={{marginTop: 16}}>

                {/* P/L by recent strategy (defaults to this month) */}
                <PnLByStrategy />

                {/* Balance of each connected exchange account (defaults to this month) */}
                <ExchangeAccountBalances />
                
                {/* Currently open positions */}
                <OpenPositions />

                {/* Recently closed positions */}
                <RecentlyClosedPositions />

                {/* Total profit by exchange */}
                <ProfitByExchange />
                
            </SimpleGrid>

            {/* Top sales for scripts (strategies, indicators and signals) (default to this month) */}
            <TopSellingProducts />
        </div>
    );
};

export default Dashboard;