import React, { useEffect } from 'react';
import { Anchor, Button, createStyles, Group, Paper, Progress, ScrollArea, SimpleGrid, Table, Text } from '@mantine/core';
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
  
interface ExchangeAccountBalancesProps {
    
};

export default function ExchangeAccountBalances({ }: ExchangeAccountBalancesProps) {
    const { classes, theme } = useStyles();
	const [exchangeAccounts, setExchangeAccounts] = React.useState([
		/*{
			id: 1,
            name: 'Exchange Account 1',
            locked: 0.10,
            free: 0.90,
            total: 1.00,
		},
		{
			id: 1,
            name: 'Exchange Account 2',
            locked: 0.10,
            free: 1.90,
            total: 2.00,
		}*/
	]);

	const Icon = icons.user;

	useEffect(() => {
		// get the metric from the api
		getMetrics('exchange-account-balances').then((res: any) => {
		  console.log(res);
		  setExchangeAccounts(res.data);
		})
		.catch(err => {
		  console.log(err);
		});
	}, []);

	const exchangeAccountBalances = exchangeAccounts.map((e: any) => {
		return (<tr key={'exchange-account-' + e.exchange_account_id}>
			<td>
				<Anchor<'a'> size="sm" onClick={(event: any) => event.preventDefault()}>
					{e.exchange_account}
				</Anchor>
			</td>
			<td>
				${e.locked.toFixed(2)}
			</td>
			<td>
				${e.free.toFixed(2)}
			</td>
			<td>
                <Text size="xs" color={e.total >= 0 ? 'teal' : 'red'} weight={700}>
                    ${e.total.toFixed(2)}
                </Text>
			</td>
		</tr>);
	});

    return <>
		<div className={classes.root}>
			<Paper withBorder p="md" radius="md" key="open-positions">
				<Group position="apart">
					<Text size="xs" color="dimmed" className={classes.title}>
						Exchange Account Balances
					</Text>
					<Icon className={classes.icon} size={22} stroke={1.5} />
				</Group>
		
				<Table verticalSpacing="xs">
					<thead>
						<tr>
							<th>Name</th>
							<th>Locked</th>
                            <th>Free</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>{exchangeAccountBalances}</tbody>
				</Table>
	
				{/* <Text size="xs" color="dimmed" mt={7}>
					Compared to previous month
				</Text> */}
			</Paper>
		</div>
    </>;
}