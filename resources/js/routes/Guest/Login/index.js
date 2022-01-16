import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'

import { login } from '../../../api/user';
import { setUser } from '../../../redux/user';

import './style.scss';

const Login = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const submit = (data) => {
        login({ ...data }).then(({ data }) => {
            dispatch(setUser(data));
            window.location.reload();
        }).catch((err) => console.log(err));
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" {...register('email', {  required: true })} />
                {errors.email && <span className="error">This field is required</span>}
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" {...register('password', { required: true })} />
                {errors.password && <span className="error">This field is required</span>}
            </div>
            <div className="form-group">
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default Login;