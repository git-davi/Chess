import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './NavBar';
import GamesHandler from './home/GamesHandler';
import GameRoom from './play/GameRoom';


export default function Game() {
    const [refresh, setRefresh] = useState(true);

    return (
        <div className="container">
            <Router>
                <Switch>
                    <Route path="/room/:game_uuid">
                        <NavBar refresh={refresh} setRefresh={setRefresh} />
                        <GameRoom setRefresh={setRefresh} />
                    </Route>
                    <Route path="/">
                        <NavBar refresh={refresh} setRefresh={setRefresh} />
                        <GamesHandler refresh={refresh} setRefresh={setRefresh} />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}