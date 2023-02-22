import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar/Navbar';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { useDispatch } from 'react-redux';
import { checkAuth } from './store/asyncThunk/authThunk';

const App = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if(localStorage.getItem('token')) {
      dispatch(checkAuth())
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [dispatch])

  if(isLoading) {
    return (
      <div style={{textAlign: 'center', marginTop: '200px'}}>
        Loading...
      </div>
    )
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <div className='wrap'>
          <AppRouter />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;