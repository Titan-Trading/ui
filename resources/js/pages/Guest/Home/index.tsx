import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'
import { Button, Alert } from '@mantine/core';
import { HiXCircle } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';

import { login } from 'API/users';
import { setUser } from 'Redux/user';
import { Input } from 'Components/Forms';
import { PATHS } from 'Paths';

const Home = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<boolean>(false);
    const { authed } = PATHS;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <h1>Home</h1>
    )
}

export default Home;