import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from 'Paths';
import { setTitle } from 'Redux/layout';
import { Anchor, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

const Projects = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { authed } = PATHS;

    // load projects from api

    useEffect(() => {
        dispatch(setTitle(`Projects`));
    }, []);

    return (
        <>
            <h1>Projects</h1>
        </>
    )
};

export default Projects;