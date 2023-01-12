import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from 'Paths';
import { setTitle } from 'Redux/layout';

const Indicators = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { authed } = PATHS;

    // load projects from api

    useEffect(() => {
        dispatch(setTitle(`Indicators`));
    }, []);

    return (
        <>
            <h1>Indicators</h1>
        </>
    )
};

export default Indicators;