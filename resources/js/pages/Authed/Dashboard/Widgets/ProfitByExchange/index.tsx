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
  
interface ProfitByExchangeProps {
    
};

export default function ProfitByExchange({ }: ProfitByExchangeProps) {
    const { classes, theme } = useStyles();
	const [exchanges, setExchanges] = React.useState([
		/*{
			id: 1,
            name: 'Exchange 1',
            total: 100000.29
		},
		{
			id: 1,
            name: 'Exchange 2',
            total: 289348.34
		}*/
	]);

	const Icon = icons.user;

	useEffect(() => {
		// get the metric from the api
		getMetrics('profit-by-exchange').then((res: any) => {
		  console.log(res);
		  setExchanges(res.data);
		})
		.catch(err => {
		  console.log(err);
		});
	}, []);

	const profitsByExchange = exchanges.map((e: any) => {
		return (<tr key={'exchange-' + e.id}>
			<td>
				<Anchor<'a'> size="sm" onClick={(event: any) => event.preventDefault()}>
					{e.name}
				</Anchor>
			</td>
			<td>
                <Text size="xs" weight={700}>
                    ${e.profit.toFixed(2)}
                </Text>
			</td>
		</tr>);
	});

    return <>
		<div className={classes.root}>
			<Paper withBorder p="md" radius="md" key="open-positions">
				<Group position="apart">
					<Text size="xs" color="dimmed" className={classes.title}>
						Profit by Exchange
					</Text>
					<Icon className={classes.icon} size={22} stroke={1.5} />
				</Group>
		
				<Table verticalSpacing="xs">
					<thead>
						<tr>
							<th>Name</th>
							<th>Profit</th>
						</tr>
					</thead>
					<tbody>{profitsByExchange}</tbody>
				</Table>
	
				{/* <Text size="xs" color="dimmed" mt={7}>
					Compared to previous month
				</Text> */}
			</Paper>
		</div>
    </>;
}