import React from 'react';
import { useDispatch } from 'react-redux';
import { removeAvatar, uploadAvatar } from '../store/asyncThunk/authThunk';

const Profile = () => {
    const dispatch = useDispatch()

    const changeHandler = e => {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }

    return (
        <div className='profile'>
            <input
                onChange={changeHandler} 
                accept='image/*' 
                style={{width: 400, margin: '20px 20px 0 0'}} 
                type="file" 
            />
            <button onClick={() => dispatch(removeAvatar())}>Delete</button>
        </div>
    );
};

export default Profile;