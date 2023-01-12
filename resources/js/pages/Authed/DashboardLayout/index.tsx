import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppShell, Box, Title, Breadcrumbs, Anchor, Loader, Center } from '@mantine/core';
import { PATHS } from 'Routes/index';

import Navbar from './Navbar';

const DashboardLayout = () => {
    const userStore = useSelector((store: any) => store.user);
    const { title, showLoader } = useSelector((store: any) => store.layout);
	const { guest, authed } = PATHS;
	const navigate = useNavigate();

    const items = [
        { title: 'Mantine', href: 'https://mantine.dev' },
        { title: 'Mantine hooks', href: 'https://mantine.dev/hooks/getting-started' },
        { title: 'use-id', href: 'https://mantine.dev/hooks/use-id' },
      ].map((item, index) => (
        <Anchor href={item.href} key={index}>
          {item.title}
        </Anchor>
      ));

    useEffect(() => {
		if(!userStore) {
            navigate(guest.login);
            return;
        }
    }, []);

    return (
        <AppShell
            padding="xl"
            navbar={<Navbar />}
        >
			{showLoader ? <Center><Loader size="xl" variant="bars" /></Center> : <Outlet />}
        </AppShell>
    )
};

export default DashboardLayout;