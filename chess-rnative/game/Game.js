import React, { useState, useEffect } from 'react';
import { NativeRouter as Router, Switch, Route } from 'react-router-native';
import { View } from 'native-base';

import NavBar from './NavBar';
import GamesHandler from './home/GamesHandler';
//import GameRoom from './play/GameRoom';



export default function Game() {
    const [refresh, setRefresh] = useState();
    
    useEffect(() => {
        setRefresh(false);
    }, [refresh]);

   return (
        <View>
            <Router>
                <Switch>
                    <Route path="/room/:game_uuid">
                        <NavBar refresh={refresh} setRefresh={setRefresh} />
                    </Route>
                    <Route path="/">
                        <NavBar refresh={refresh} setRefresh={setRefresh} />
                        <GamesHandler />
                    </Route>
                </Switch>
            </Router>
        </View>
    );
    /*
    return (
        <View>
            <Router>
                <Switch>
                    <Route path="/room/:game_uuid">
                        <NavBar refresh={refresh} setRefresh={setRefresh} />
                        <GameRoom setRefresh={setRefresh}/>
                    </Route>
                    <Route path="/">
                        <NavBar refresh={refresh} setRefresh={setRefresh} />
                        <GamesHandler />
                    </Route>
                </Switch>
            </Router>
        </View>
    );
    */
}