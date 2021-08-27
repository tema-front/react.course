// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Message } from './components/Message';

const warningTxt = 'Внимание, вы не авторизованы. Опции ограниченны'

function App() {
  return (
    <div className="App">

      <Message text={warningTxt}/>
    </div>
  );
}
// const message = 'This is first task with react course';

// ReactDOM.render(
//   <React.StrictMode>
//     <Message mess={ message }/>
//   </React.StrictMode>,
//   document.getElementsByClassName('App')
// );


// Message(message)

export default App;
