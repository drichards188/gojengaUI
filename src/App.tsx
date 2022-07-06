import React, {useState} from 'react';
import logo from './logo.svg';
import { Counter } from './components/counter/Counter';
import './App.css';
import {Banking} from "./components/banking/Banking";
import styles from "./components/banking/Banking.module.css";
import {useAppDispatch} from "./app/hooks";
import {resetState} from "./components/banking/BankingSlice";

function handleExit(setDisplayBlockchain: any, dispatch: any) {
  setDisplayBlockchain(false)
  dispatch(resetState())
}

function App() {
  const [displayCount, setDisplayCount] = useState(false);
  const [displayBanking, setDisplayBanking] = useState(false);
  const dispatch = useAppDispatch();

  let counter;
  let banking;

  if (displayCount) {
    counter = <Counter/>
  }

  if (displayBanking) {
    banking = <div>
      <Banking/>
      <button
          className={styles.button}
          onClick={() => handleExit(setDisplayBanking, dispatch(resetState()))}
      >
        Exit
      </button>
    </div>

  } else {
    banking = <button
        className={styles.button}
        onClick={() => setDisplayBanking(true)}
    >
      Welcome
    </button>
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {banking}
      </header>
    </div>
  );
}

export default App;
