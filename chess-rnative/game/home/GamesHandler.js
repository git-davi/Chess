import React, { useState } from 'react';
import { View, Card } from 'native-base';

import GamesList from './GamesList';
import SearchGame from './SearchGame';


export default function GamesHandler({ refresh, setRefresh }) {

    const [games, setGames] = useState([]);

    return (
        <Card>
            <View>
                <SearchGame games={games} setGames={setGames}/>
                <GamesList games={games} setGames={setGames} refresh={refresh} setRefresh={setRefresh} />
            </View>
        </Card>
    );
}