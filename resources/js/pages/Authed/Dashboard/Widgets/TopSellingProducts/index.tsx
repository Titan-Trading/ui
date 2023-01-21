import React from 'react';
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
  
const useStyles = createStyles((theme) => ({
    root: {
      padding: theme.spacing.xl * 1.5,
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
  
interface TopSellingProductsProps {
};

export default function TopSellingProducts({ }: TopSellingProductsProps) {
    const { classes } = useStyles();

    return <></>;
}