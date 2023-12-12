import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CustomerInput from './customerInput';
import { AIResponse } from './aiResponse';

function App() {

  const [info, setInfo] = useState({
    data: '',
  });
  const sendData = (info:any) => {
    setInfo(info)
    console.log('Info-data: ' + info.data)
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CustomerInput sendData={sendData} />
        <AIResponse data={info.data} />
      </header>
    </div>
  );
}

export default App;
