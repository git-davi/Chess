import React, { useContext } from 'react';
import { RefreshContext } from './Game';

import { View } from 'native-base';

import NavBar from './NavBar';
import GamesHandler from './home/GamesHandler'

export default function Home() {

    const value = useContext(RefreshContext);

    return (
        <View>
            <NavBar refresh={value.refresh} setRefresh={value.setRefresh} />
            <GamesHandler refresh={value.refresh} setRefresh={value.setRefresh}/>
        </View>
    );
}