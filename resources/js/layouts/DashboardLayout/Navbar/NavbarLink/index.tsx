import React from 'react'
import { createStyles, Tooltip, UnstyledButton } from '@mantine/core';
import {TablerIcon} from '@tabler/icons';

interface NavbarLinkProps {
    icon: TablerIcon;
    label: string;
    disabled?: boolean;
    active?: boolean;
    onClick?(): void;
}

const useStyles = createStyles((theme) => ({
    link: {
        width: 50,
        height: 50,
        borderRadius: theme.radius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.white,
        opacity: 0.7,
        '&:hover': {
            opacity: 1,
            // backgroundColor: theme.fn.lighten(
            //     theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
            //     0.1
            // ),
        },
    },
    active: {
        opacity: 1,
        '&, &:hover': {
            // backgroundColor: theme.fn.lighten(
                // theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
                // 0.15
            // ),
        },
    },
}));
  
function NavbarLink({ icon: Icon, label, disabled, active, onClick }: NavbarLinkProps) {
    const { classes, cx } = useStyles();
    
    return (
        <Tooltip label={label} position="right" transitionDuration={0}>
            <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })} disabled={disabled}>
                <Icon stroke={1.5} />
            </UnstyledButton>
        </Tooltip>
    );
}

export default NavbarLink;