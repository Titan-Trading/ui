import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppShell, Loader, Center } from '@mantine/core';
import { PATHS } from 'Routes/index';
import Navbar from './Navbar';
import SmartBreadcrumbs from 'Components/SmartBreadcrumbs';

const DashboardLayout = () => {
    const userStore = useSelector((store: any) => store.user);
    const { title, showLoader } = useSelector((store: any) => store.layout);
	const { guest, authed } = PATHS;
	const navigate = useNavigate();

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
			{showLoader ? <>
				<Center><Loader size="xl" variant="bars" /></Center>
			</> : <>
				<SmartBreadcrumbs />

				<Outlet />
			</>}
      	</AppShell>
    )
};

export default DashboardLayout;