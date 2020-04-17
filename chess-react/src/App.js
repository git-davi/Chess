import React, { useState, createContext } from 'react';

import Login from './login/Login';
import Game from './game/Game';

import {TOKEN_KEY} from './storageKeys.js';

export const AuthContext = createContext();

function App() {
  const [auth, setAuth] = useState(localStorage.getItem(TOKEN_KEY) !== null);

  return (
    <AuthContext.Provider value={{auth : auth,  setAuth : setAuth}}>
      { auth ? <Game /> : <Login /> }
    </AuthContext.Provider>
  );
}

export default App;
