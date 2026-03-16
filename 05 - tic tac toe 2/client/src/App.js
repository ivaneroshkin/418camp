import React, {useState, useEffect} from 'react';
import axios from 'axios';

import './App.css';

import { fieldUrl, moveUrl, winnerUrl, resetUrl } from './constants';

function App() {
  const [field, setField] = useState([[0, 0, 0],[0, 0, 0],[0, 0, 0]]);
  const [winner, setWinner] = useState('');

  const updateField = function() {
    axios.get(fieldUrl).then(res => {
      setField(res.data);
    })
  }

  const move = function(x, y) {
    axios.post(moveUrl, {
      x: x,
      y: y
    }).then(updateField);
  }

  const reset = function() {
    axios.post(resetUrl).then(updateField);
  }

  useEffect(() => {
    updateField();
    const id = setInterval(updateField, 2000);
    return () => clearInterval(id);
  }, []);

  const showCell = function(value) {
    if (!value) return ' ';
    return value === 1 ? 'x' : 'o';
  }

  const updateWinner = function() {
    axios.get(winnerUrl).then(res => {
      console.log(`winner from client`, res.data);
      setWinner(res.data.winner)
    })
  }

  useEffect(() => {
    updateWinner();
    const id = setInterval(updateWinner, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <React.Fragment>
    <h1 className='main-title'>Hello! This is Tic-Tac-Toe game!</h1>
    <div className="app-center">
      <div className="field">
        {field.map((row, y) => <div key={y} className="row">
          {row.map((el, x) => <div key={x} className="cell" onClick={() => move(x, y)}>{showCell(el)}</div>)}
        </div>)}
      </div>
    </div>
    <p className='app-center'>Winner: { winner }</p>
    <button className='reset-button' onClick={() => reset()}>Reset Field</button>
    </React.Fragment>
  );
}

export default App;
