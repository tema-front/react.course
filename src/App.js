import React, { useState, useCallback } from 'react';
import { Provider } from 'react-redux'
import store from './store'
import { Routes } from './components/Routes';
import './style/App.css';
import ThemeContext from './utils/ThemeContext'

function App() {
  const [theme, setTheme] = useState('light')

  const changeTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }, [])
  
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, changeTheme }}>
        <Routes />  
      </ThemeContext.Provider >
    </Provider>
  );
}

export default App;