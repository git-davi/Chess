import React, { useContext } from 'react';
import { RefreshContext } from './Game';

import NavBar from './NavBar';
//import GameRoom from './play/GameRoom';

export default function Room() {

    const value = useContext(RefreshContext);

    return (
        <NavBar refresh={value.refresh} setRefresh={value.setRefresh} />
    );
}