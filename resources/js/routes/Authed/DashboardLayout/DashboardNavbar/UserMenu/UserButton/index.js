import React, { forwardRef, useEffect } from 'react';
import { BiChevronRight } from 'react-icons/bi'
import { Group, Avatar, Text, UnstyledButton } from '@mantine/core';
import { useSelector } from 'react-redux';

const UserButton = forwardRef(({ user, ...other }, ref) => {
  const test = useSelector((store) => store.test);
  
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
        <Avatar src={null} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {test}
          </Text>

          <Text color="dimmed" size="xs">
            test@email.com
          </Text>
        </div>

        <BiChevronRight />
      </Group>
    </UnstyledButton>
  )
});

export default UserButton;