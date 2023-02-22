import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import {useDispatch} from 'react-redux';
import { login, registration } from '../store/asyncThunk/authThunk';

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const authApi = async () => {
        if(isLogin) {
            dispatch(login({email, password}))
        } else {
            dispatch(registration({email, password}))
        }

        setEmail('')
        setPassword('')
    }

    return (
        <div className='auth'>
            <h1 style={{marginBottom: '20px'}}>{isLogin ? 'Login' : 'Registration'}</h1>
            <input
                type="text"  
                placeholder='Email...'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input 
                type="password" 
                placeholder='Password...'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={authApi}>{isLogin ? 'Log in' : 'Create'}</button>
        </div>
    );
};

export default Auth;