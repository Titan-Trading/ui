import React, { useState } from 'react';
import { SegmentedControl, Box } from '@mantine/core';

import Bots from './Bots';
import BotSessions from './BotSessions';

const Laboratory = () => {
    const [ tab, setTab ] = useState<string>('1');
    const labPages = [
        <Bots key={0} />,
        <BotSessions key={1} />
    ];


    return (
        <>
            <SegmentedControl 
                size="lg"
                fullWidth
                value={tab}
                onChange={setTab}
                color="blue"
                data={[
                    { label: 'Bots', value: '1' },
                    { label: 'Bot Sessions', value: '2' }
                ]}
            />
            <Box styles={{ paddingTop: '75px' }}>
                {labPages[parseInt(tab) - 1]}
            </Box>
        </>
    )
};

export default Laboratory;