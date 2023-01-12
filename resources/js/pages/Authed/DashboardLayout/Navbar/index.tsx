import React, { useState } from 'react';
import { Navbar as Nav, Center, Stack, Image } from '@mantine/core';
import {
  IconHome2,
  IconSettings,
  IconLogout
} from '@tabler/icons';
import NavbarLink from './NavbarLink';
import Logo from 'Images/logo2.png';
import { FaMicroscope, FaSchool } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'Paths';
import { setUser } from 'Redux/user';
import { useDispatch } from 'react-redux';

export function Navbar() {
  const {authed, guest} = PATHS;
  const [active, setActive] = useState(2);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const routes = [
    {
      icon: IconHome2,
      label: 'Home',
      path: authed.dashboard
    },
    {
      icon: FaMicroscope,
      label: 'Lab',
      path: authed.lab
    },
    {
      icon: FaSchool,
      label: 'Boot Camp',
      path: authed.boot_camp
    }
  ];

  const links = routes.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
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
        backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
          .background,
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