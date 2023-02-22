import React, { useState } from 'react';
import './navbar.css';
import Logo from '../../assets/img/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuth, setUser } from '../../store/reducers/userSlice';
import { fetchFiles, searchFiles } from '../../store/asyncThunk/filesThunk';
import avatarLogo from '../../assets/img/avatar.svg';

const Navbar = () => {
    const {isAuth, user} = useSelector(state => state.user)
    const {currentDir} = useSelector(state => state.files)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)

    const avatar = user.user.avatar ? `http://localhost:5000/${user.user.avatar}` : avatarLogo

    const logout = () => {
        dispatch(setUser({}))
        dispatch(setIsAuth(false))
        localStorage.removeItem('token')
    }

    const searchHandler = e => {
        setSearchName(e.target.value)
        
        if(searchTimeout) {
            clearTimeout(searchTimeout)
        }

        if(e.target.value != '') {
            setSearchTimeout(setTimeout(() => {
                dispatch(searchFiles(e.target.value))
            }, 500))
        } else {
            dispatch(fetchFiles({dirId: currentDir}))
        }
    }
    return (
        <div className="navbar">
            <div className='container'>
                <img src={Logo} alt="" className='navbar__logo' />
                <div className='navbar__header'>MERN CLOUD</div>
                {!isAuth 
                ?<><div className='navbar__login'>
                    <Link style={{textDecoration: 'none'}} to={LOGIN_ROUTE}>
                        LOG IN
                    </Link>
                </div>
                <div className='navbar__registration'>
                    <Link style={{textDecoration: 'none'}} to={REGISTRATION_ROUTE}>
                        REGISTRATION
                    </Link>
                </div></>
                : 
                <>
                    <input
                        type="text"
                        placeholder='Search...'
                        value={searchName}
                        onChange={searchHandler}
                        style={{width: 300, marginLeft: 100}}
                    />
                    <div
                        className="navbar__logout"
                        style={{marginLeft: 'auto', cursor: 'pointer'}}
                        onClick={logout}
                        >
                        LOGOUT
                    </div>
                    <img 
                        onClick={() => navigate(PROFILE_ROUTE)} 
                        src={avatar} 
                        alt="Avatar" 
                        className='avatar__img' 
                    />
                </>
                }
            </div>
        </div>
    );
};

export default Navbar;