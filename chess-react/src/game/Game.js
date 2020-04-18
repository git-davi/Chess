import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './NavBar';
import GamesHandler from './home/GamesHandler';
import GameRoom from './play/GameRoom';


export default function Game() {


    return (
        <div className="container">
            <Router>
                <Switch>
                    <Route path="/game/:game_uuid">
                        <NavBar />
                        <GameRoom />
                    </Route>
                    <Route path="/">
                        <NavBar />
                        <GamesHandler />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}