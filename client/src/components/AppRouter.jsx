import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom'; 
import { authRoutes, publicRoutes } from '../routes';
import {useSelector} from 'react-redux';
import { DISK_ROUTE, LOGIN_ROUTE } from '../utils/consts';

const AppRouter = () => {
    const {isAuth} = useSelector(state => state.user)

    return (
        <Routes>
            {!isAuth && publicRoutes.map(({path, element}) => 
                <React.Fragment key={path}>
                    <Route path={path} element={element} key={path} />
                    <Route path='*' element={<Navigate to={LOGIN_ROUTE} />} key={path} />
                </React.Fragment>
            )}
            {isAuth && authRoutes.map(({path, element}) => 
                <React.Fragment key={path}>
                    <Route path={path} element={element} key={path} />
                    <Route path='*' element={<Navigate to={DISK_ROUTE} />} key={path} />
                </React.Fragment>
            )}
        </Routes>
    );
};

export default AppRouter;