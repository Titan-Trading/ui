import React from 'react';
import { BiChevronRight } from 'react-icons/bi'
import { Group, Avatar, Text, UnstyledButton } from '@mantine/core';
import { useSelector } from 'react-redux';

const UserButton = () => {
  const user = useSelector((store) => store.user);
  console.log(user);

  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
        },
      })}
    >
      <Group>
        <Avatar src={null} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            Testing
          </Text>

          <Text color="dimmed" size="xs">
            test@email.com
          </Text>
        </div>

        <BiChevronRight />
      </Group>
    </UnstyledButton>
  )
};

export default UserButton;