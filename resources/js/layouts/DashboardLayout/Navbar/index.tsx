import React, { useState } from 'react';
import { Navbar as Nav, Center, Stack, Image } from '@mantine/core';
import {
  IconSettings,
  IconLogout,
  IconHelp,
  IconHomeSignal,
  IconShieldHalfFilled
} from '@tabler/icons';
import NavbarLink from './NavbarLink';
import Logo from 'Images/gold-coin.png';
import { FaDatabase, FaGraduationCap, FaMicroscope, FaStore } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'Paths';
import { setUser } from 'Redux/user';
import { useDispatch } from 'react-redux';
import { BsLightningFill } from 'react-icons/bs';
export function Navbar() {
  const {authed, guest} = PATHS;
  const [active, setActive] = useState(2);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const routes = [
    {
      icon: IconHomeSignal,
      label: 'Home',
      path: authed.dashboard
    },
    {
      icon: IconShieldHalfFilled,
      label: 'War Room (coming soon)',
      path: authed.war_room
    },
    {
      icon: FaMicroscope,
      label: 'Lab',
      path: authed.lab
    },
    {
      icon: FaGraduationCap,
      label: 'Boot Camp',
      path: authed.boot_camp
    },
    {
      icon: BsLightningFill,
      label: 'Live Trading',
      path: authed.live_trading
    },
    {
      icon: FaStore,
      label: 'Marketplace',
      path: authed.marketplace
    },
    {
      icon: FaDatabase,
      label: 'Datasets',
      path: authed.datasets
    },
    {
      icon: IconHelp,
      label: 'Support',
      path: authed.support
    }
  ];

  const links = routes.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      disabled={link.label == 'War Room (coming soon)'}
      onClick={() => {
        setActive(index)

        navigate(link.path)
      }}
    />
  ));

  const handleLogout = () => {
    dispatch(setUser({}));

    navigate(guest.login);
  };

  return (
    <Nav
      height='auto'
      width={{ base: 80 }}
      p="md"
      sx={(theme) => ({
        // backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        //   .background,
      })}
    >
      <Center>
        <Image 
          sx={{
            maxWidth: '90px'
          }}
          src={Logo} 
          alt="Simple Trader logo" 
        />
      </Center>
      <Nav.Section grow mt={50}>
        <Stack justify="center" spacing={4}>
          {links}
        </Stack>
      </Nav.Section>
      <Nav.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconSettings} label="Settings" onClick={() => navigate(authed.settings)} />
          <NavbarLink icon={IconLogout} label="Logout" onClick={() => handleLogout()} />
        </Stack>
      </Nav.Section>
    </Nav>
  );
}

export default Navbar;