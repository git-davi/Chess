import React, { useState } from 'react';
import { View } from 'native-base';

import GamesList from './GamesList';
import SearchGame from './SearchGame';


export default function GamesHandler() {

    const [games, setGames] = useState([]);

    return (
        <View>
            <View>
                <SearchGame games={games} setGames={setGames}/>
                <GamesList games={games} setGames={setGames}/>
            </View>
        </View>
    );
}