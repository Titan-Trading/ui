import React, { useState, useEffect } from 'react';
import { Title, Alert, Grid } from '@mantine/core';
import { HiXCircle } from 'react-icons/hi';

// import CreateExchangeAccount from './Create';
// import ExchangeAccountList from './ExchangeAccountList';
// import { getExchangeAccounts } from 'API/exchangeAccounts';



const Withdraw = () => {
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<boolean>(false);

    useEffect(() => {
        setError(false);

        // getExchangeAccounts().then(({ data }) => {
        //     data = data.map((d: IExchangeAccount) => {
        //         return {
        //             api_key: d.api_key,
        //             name: d.exchange.name,
        //             id: d.id,
        //             user_id: d.user_id,
        //             wallet_private_key: d.wallet_private_key
        //         };
        //     });

        //     setExchangeAccounts(data);
        //     setLoading(false);
        // }).catch(() => {
        //     setLoading(false);
        //     setError(true);
        // });
    }, []);

    return (
        <>
            {/* Title with space for button */}
            <Grid columns={12} style={{margin: '8px 0'}}>
                <Grid.Col span={6}>
                    <span style={{ margin: '25px 0', fontSize: '24px' }}>Withdraw settings</span>
                </Grid.Col>
                <Grid.Col span={6} style={{textAlign: 'right'}}>
                    
                </Grid.Col>
            </Grid>
            {/* <CreateExchangeAccount 
                exchangeAccounts={exchangeAccounts} 
                setExchangeAccounts={setExchangeAccounts} 
            />

            {error ? (
                <Alert style={{ marginTop: '25px' }} icon={<HiXCircle />} color="red">
                    Error: Unable to retrieve connected exchanges
                </Alert>
            ) : (
                <ExchangeAccountList 
                    exchangeAccounts={exchangeAccounts} 
                    setExchangeAccounts={setExchangeAccounts} 
                    loading={loading}
                />
            )} */}
        </>
    );
};

export default Withdraw;