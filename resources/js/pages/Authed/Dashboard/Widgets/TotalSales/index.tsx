import React, { useEffect } from 'react';
import { createStyles, Group, Paper, SimpleGrid, Text } from '@mantine/core';
import {
    IconUserPlus,
    IconDiscount2,
    IconReceipt2,
    IconCoin,
    IconArrowUpRight,
    IconArrowDownRight,
    IconMoneybag,
} from '@tabler/icons';
import { useSelector, useStore } from 'react-redux';
import { getBalance, getBalanceBreakdown, getTotalSales } from 'API/users';
  
const useStyles = createStyles((theme) => ({
    root: {
      padding: 0,
    },
  
    value: {
      fontSize: 24,
      fontWeight: 700,
      lineHeight: 1,
    },
  
    diff: {
      lineHeight: 1,
      display: 'flex',
      alignItems: 'center',
    },
  
    icon: {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
    },
  
    title: {
      fontWeight: 700,
      textTransform: 'uppercase',
    },
}));
  
const icons = {
    user: IconUserPlus,
    money: IconMoneybag,
    discount: IconDiscount2,
    receipt: IconReceipt2,
    coin: IconCoin,
};
  
interface TotalSalesProps {
};

export default function TotalSales({ }: TotalSalesProps) {
    const { classes } = useStyles();
    const [totalSales, setTotalSales] = React.useState(0);

    const Icon = icons.coin ? icons.coin : icons.user;
	  const diff = 34;
    const DiffIcon = diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    useEffect(() => {
      // get the total sales for the account
      getTotalSales().then((res: any) => {
        console.log(res);
        setTotalSales(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    }, []);

    return <div className={classes.root}>
        <Paper withBorder p="md" radius="md" key='balance-breakdown'>
          <Group position="apart">
            <Text size="xs" color="dimmed" className={classes.title}>
              Sales
            </Text>
            <Icon className={classes.icon} size={22} stroke={1.5} />
          </Group>

          <Group align="flex-end" spacing="xs" mt={25}>
            <Text className={classes.value}>${totalSales}</Text>
            {totalSales && <Text
              color={diff > 0 ? 'teal' : 'red'}
              size="sm"
              weight={500}
              className={classes.diff}
            >
              <span>{diff}%</span>
              <DiffIcon size={16} stroke={1.5} />
            </Text>}
          </Group>

          <Text size="xs" color="dimmed" mt={7}>
            Compared to previous month
          </Text>
      </Paper>
    </div>;
}