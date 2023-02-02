import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from 'Paths';
import { setTitle } from 'Redux/layout';


const Setup = () => {
    const [ tab, setTab ] = useState<string>('1');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { projectId } = useParams();
    const { authed } = PATHS;

    // load project details from api

    useEffect(() => {
        dispatch(setTitle(`Project - ${projectId}`));
    }, []);

    return (
        <>
            {/* Project name */}
            <h3>Unnamed Project</h3>

            {/* List backtest session */}
        </>
    )
};

export default Setup;