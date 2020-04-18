import React, { useState } from 'react';

import GamesList from './GamesList';
import SearchGame from './SearchGame';


export default function GamesHandler() {

    const [games, setGames] = useState([]);

    return (
        <div className="container">
            <div className="card mt-3">
                <SearchGame games={games} setGames={setGames}/>
                <GamesList games={games} setGames={setGames}/>
            </div>
        </div>
    );
}