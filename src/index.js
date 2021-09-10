import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const myName = 'Tema'

ReactDOM.render(
  <React.StrictMode>
    <App name={myName}/>
  </React.StrictMode>,
  document.getElementById('root')
);

