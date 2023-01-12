import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from 'Paths';
import { setTitle } from 'Redux/layout';
import { Anchor, Breadcrumbs, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

const Projects = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { authed } = PATHS;
    const breadCrumbItems = [
        {title: 'Dashboard', href: `/`},
        {title: 'Lab', href: `/lab`},
        {title: 'Projects', href: null}
    ];
    const [ breadCrumbs, setBreadCrumbs ] = useState<any>([]);

    // load projects from api

    useEffect(() => {
        const crumbs = breadCrumbItems.map((item, index) => (
            item.href ? <Link to={item.href} key={index}>{item.title}</Link> : <Text key={index}>{item.title}</Text>
        ));
        setBreadCrumbs(crumbs);

        dispatch(setTitle(`Projects`));
    }, []);

    return (
        <>
            <Breadcrumbs className="breadcrumb-container">{breadCrumbs}</Breadcrumbs>

            <h1>Projects</h1>
        </>
    )
};

export default Projects;