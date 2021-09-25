import React, { useState, useCallback } from 'react';
import { Provider } from 'react-redux'
import store, { persistor } from './store'
import { Routes } from './components/Routes';
import './style/App.css';
import ThemeContext from './utils/ThemeContext'
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  const [theme, setTheme] = useState('light')

  const changeTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }, [])
  
  return (
    <Provider store={store} >
      <PersistGate persistor={persistor}>
        <ThemeContext.Provider value={{ theme, changeTheme }}>
          <Routes />  
        </ThemeContext.Provider >
      </ PersistGate>
    </Provider>
  );
}

export default App;