import React, { useEffect } from 'react';
import { Anchor, createStyles, Group, Paper, Progress, ScrollArea, SimpleGrid, Table, Text } from '@mantine/core';
import {
    IconUserPlus,
    IconDiscount2,
    IconReceipt2,
    IconCoin,
    IconArrowUpRight,
    IconArrowDownRight,
    IconMoneybag,
} from '@tabler/icons';
import { getMetrics } from 'API/users';
  
const useStyles = createStyles((theme) => ({
	root: {
		padding: 0,

	},
    progressBar: {
		'&:not(:first-of-type)': {
		  	borderLeft: `3px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`
		}
	},
	icon: {
		color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
	},
	title: {
		fontWeight: 700,
		textTransform: 'uppercase',
	}
}));
  
const icons = {
    user: IconUserPlus,
    money: IconMoneybag,
    discount: IconDiscount2,
    receipt: IconReceipt2,
    coin: IconCoin,
};
  
interface RecentlyClosedPositionsProps {
    
};

export default function RecentlyClosedPositions({ }: RecentlyClosedPositionsProps) {
    const { classes, theme } = useStyles();
	const [positions, setPositions] = React.useState([
		{
			id: 1,
            date: '2021-01-01 00:00:00',
            symbol: 'ETH/USDT',
			strategy: {
				id: 1,
				name: 'Strategy 1'
			},
            exchange: {
                id: 1,
                name: 'Exchange 1'
            },
			price: 2000,
			quantity: 0.3,
			profit_loss: 1.30,
		},
		{
			id: 2,
            date: '2021-01-02 02:05:20',
            symbol: 'BTC/USDT',
			strategy: {
				id: 1,
				name: 'Strategy 1'
			},
            exchange: {
                id: 1,
                name: 'Exchange 1'
            },
			price: 30000,
			quantity: 0.01,
			profit_loss: -12.36,
		}
	]);

	const Icon = icons.user;

	useEffect(() => {
		// get the metric from the api
		getMetrics('recently-closed-positions').then((res: any) => {
		  console.log(res);
		  setPositions(res.data);
		})
		.catch(err => {
		  console.log(err);
		});
	}, []);

	const closedPositions = positions.map((p: any) => {
		return (<tr key={'closed-position-' + p.id}>
            <td>
				<Text size="xs">{p.date}</Text>
			</td>
			<td>
				<Anchor<'a'> size="sm" onClick={(event: any) => event.preventDefault()}>
					{p.strategy.name}
				</Anchor>
			</td>
			<td>
				<Anchor<'a'> size="sm" onClick={(event: any) => event.preventDefault()}>
					{p.symbol} ({p.exchange.name})
				</Anchor>
			</td>
			<td>
				{p.quantity} @ {p.price}
			</td>
			<td>
                <Text size="xs" color={p.profit_loss >= 0 ? 'teal' : 'red'} weight={700}>
                    {p.profit_loss.toFixed(2)}%
                </Text>
			</td>
		</tr>);
	});

    return <>
		<div className={classes.root}>
			<Paper withBorder p="md" radius="md" key="recently-closed-positions">
				<Group position="apart">
					<Text size="xs" color="dimmed" className={classes.title}>
						Recently closed positions
					</Text>
					<Icon className={classes.icon} size={22} stroke={1.5} />
				</Group>
		
				<Table verticalSpacing="xs">
					<thead>
						<tr>
                            <th>Timestamp</th>
							<th>Name</th>
							<th>Symbol</th>
							<th>Quantity/Price</th>
                            <th>Profit/Loss</th>
						</tr>
					</thead>
					<tbody>{closedPositions}</tbody>
				</Table>
	
				{/* <Text size="xs" color="dimmed" mt={7}>
					Compared to previous month
				</Text> */}
			</Paper>
		</div>
    </>;
}