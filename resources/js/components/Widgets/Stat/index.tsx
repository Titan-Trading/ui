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
  
  interface StatProps {
    title: string;
    icon: keyof typeof icons;
    value: string;
    diff: number;
    subtext?: string;
 };
  
  export default function Stat({ title, icon, value, diff, subtext }: StatProps) {
    const { classes } = useStyles();

    const Icon = icons[icon] ? icons[icon] : icons.user;
    const DiffIcon = diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <div className={classes.root}>
        <Paper withBorder p="md" radius="md" key={title}>
          <Group position="apart">
            <Text size="xs" color="dimmed" className={classes.title}>
              {title}
            </Text>
            <Icon className={classes.icon} size={22} stroke={1.5} />
          </Group>
  
          <Group align="flex-end" spacing="xs" mt={25}>
            <Text className={classes.value}>{value}</Text>
            <Text
              color={diff > 0 ? 'teal' : 'red'}
              size="sm"
              weight={500}
              className={classes.diff}
            >
              <span>{diff}%</span>
              <DiffIcon size={16} stroke={1.5} />
            </Text>
          </Group>
  
          {subtext && <Text size="xs" color="dimmed" mt={7}>
            {subtext}
          </Text>}
        </Paper>
      </div>
    );
  }