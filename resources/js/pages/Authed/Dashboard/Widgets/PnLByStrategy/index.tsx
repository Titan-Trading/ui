import React, { useEffect } from 'react';
import { Anchor, Button, createStyles, Group, Paper, Progress, ScrollArea, SimpleGrid, Space, Table, Text } from '@mantine/core';
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
import { BsStopBtn, BsStopFill } from 'react-icons/bs';
import { BiPause, BiStop } from 'react-icons/bi';
  
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
  
interface PnLByStrategyProps {
    
};

export default function PnLByStrategy({ }: PnLByStrategyProps) {
    const { classes, theme } = useStyles();
	const [strategies, setStrategies] = React.useState([
		/*{
			id: 1,
			user: {
				id: 1,
				name: 'User 1'
			},
			name: 'Strategy 1',
			profit: 100,
			loss: 0,
			profit_trades: 60,
			loss_trades: 0,
			total: 60
		},
		{
			id: 2,
			user: {
				id: 1,
				name: 'User 1'
			},
			name: 'Strategy 2',
			profit: 90,
			loss: 10,
			profit_trades: 90,
			loss_trades: 10,
			total: 100
		}*/
	]);

	const Icon = icons.user;
	const diff = 34;
    const DiffIcon = diff > 0 ? IconArrowUpRight : IconArrowDownRight;

	useEffect(() => {
		// get the metric from the api
		getMetrics('pnl-by-strategy').then((res: any) => {
		  console.log(res);
		  setStrategies(res.data);
		})
		.catch(err => {
		  console.log(err);
		});
	}, []);

	const strategyMetrics = strategies.map((strategy: any) => {
		return (<tr key={'strategy-' + strategy.id}>
			<td>
				<Anchor<'a'> size="sm" onClick={(event: any) => event.preventDefault()}>
					{strategy.name}
				</Anchor>
			</td>
            <td>
				<Anchor<'a'> size="sm" onClick={(event: any) => event.preventDefault()}>
					{strategy.author}
				</Anchor>
			</td>
			<td>
				<Text size="sm">
					{strategy.trades}
				</Text>
			</td>
			<td>
				<Group position="apart">
					<Text size="xs" color="teal" weight={700}>
						{((strategy.profitable_trades / strategy.trades) * 100).toFixed(0)}% ({strategy.profitable_trades})
					</Text>
					<Text size="xs" color="red" weight={700}>
						{((strategy.losing_trades / strategy.trades) * 100).toFixed(0)}% ({strategy.losing_trades})
					</Text>
				</Group>
				<Progress
					classNames={{ bar: classes.progressBar }}
					sections={[
					{
						value: ((strategy.profitable_trades / strategy.trades) * 100),
						color: theme.colorScheme === 'dark' ? theme.colors.teal[9] : theme.colors.teal[6],
					},
					{
						value: ((strategy.losing_trades / strategy.trades) * 100),
						color: theme.colorScheme === 'dark' ? theme.colors.red[9] : theme.colors.red[6],
					},
					]}
				/>
			</td>
            <td>
                <Button size="xs" color="red" title="Stop all active sessions">
                    <BiStop size={18} />
                </Button>
                &nbsp;&nbsp;
                <Button size="xs" color="yellow" title="Pause all active sessions">
                    <BiPause size={18} />
                </Button>
			</td>
		</tr>);
	});

    return <>
		<div className={classes.root}>
			<Paper withBorder p="md" radius="md" key="profit-loss-by-strategy">
				<Group position="apart">
					<Text size="xs" color="dimmed" className={classes.title}>
						Profit/loss by strategy
					</Text>
					<Icon className={classes.icon} size={22} stroke={1.5} />
				</Group>
		
				<Table verticalSpacing="xs">
					<thead>
						<tr>
							<th>Name</th>
							<th>Author</th>
                            <th>Trades</th>
							<th>P/L distribution</th>
                            <th></th>
						</tr>
					</thead>
					<tbody>{strategyMetrics}</tbody>
				</Table>
	
				{/* <Text size="xs" color="dimmed" mt={7}>
					Compared to previous month
				</Text> */}
			</Paper>
		</div>
    </>;
}