import React, { forwardRef } from 'react';
import { BiChevronRight } from 'react-icons/bi'
import { Group, Avatar, Text, UnstyledButton } from '@mantine/core';

interface IUserButton {
  user: any;
}

const UserButton = forwardRef(({ user, ...other }: IUserButton, ref: any) => {  
  return (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        borderRadius: '4px',
        padding: theme.spacing.sm,
        color: theme.black,
        '&:hover': {
          backgroundColor: theme.colors.gray[2],
        },
      })}
      {...other}
    >
      <Group>
        <Avatar src={undefined} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {user.metadata.name}
          </Text>

          <Text color="dimmed" size="xs">
            {user.metadata.email}
          </Text>
        </div>

        <BiChevronRight />
      </Group>
    </UnstyledButton>
  )
});

export default UserButton;