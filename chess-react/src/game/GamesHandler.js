import React, { useState } from 'react';

import GamesList from './GamesList';
import SearchGame from './SearchGame';


export default function GamesHandler() {
    
    const [games, setGames] = useState([]);
    
    return (
        <div className="container mt-5">
            <SearchGame />
            <GamesList games={games} setGames={setGames}/>
        </div>
    );
}