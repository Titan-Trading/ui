import React, { useEffect } from 'react';
import { RingProgress, Text, SimpleGrid, Paper, Center, Group, createStyles } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons';
import { useSelector, useStore } from 'react-redux';
import { getBootCampCompletion } from 'API/users';
  
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
    up: IconArrowUpRight,
    down: IconArrowDownRight,
};
  
interface BootCampCompletionProps {
};

export default function BootCampCompletion({ }: BootCampCompletionProps) {
    const { classes } = useStyles();
    const [bootCampCompletion, setBootCampCompletion] = React.useState(0);

    useEffect(() => {
      // get the completion percentage
      getBootCampCompletion().then((res: any) => {
        console.log(res);
        setBootCampCompletion(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    }, []);

    const Icon = icons.up;

    return (
        <Paper withBorder radius="md" p="md" key='boot-camp-completion'>
            <Group>
                <RingProgress
                    size={80}
                    roundCaps
                    thickness={8}
                    sections={[{ value: bootCampCompletion, color: 'green' }]}
                    label={
                        <Center>
                            <Icon size={22} stroke={1.5} />
                        </Center>
                    }
                />

                <div>
                    <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                        BootCamp Completion
                    </Text>
                    <Text weight={700} size="xl">
                        {bootCampCompletion}%
                    </Text>
                </div>
            </Group>
        </Paper>
    );

}

interface StatsRingProps {
  data: {
    label: string;
    stats: string;
    progress: number;
    color: string;
    icon: 'up' | 'down';
  }[];
}
