import React, { useEffect, useContext, useState } from 'react';

//import PlayGame from './PlayGame';

import { axiosAuthWrapper as axioAW } from '../util/axiosAuthWrapper';
import { AuthContext } from '../../App';
import { TOKEN_KEY } from '../../storageKeys';

import io from 'socket.io-client';
import { View, Button, Text } from 'native-base';

export default function GameRoom({ setRefresh, navigation, game_uuid }) {

    const authContext = useContext(AuthContext);
    const [forbidden, setForbidden ] = useState(false);
    const [white, setWhite] = useState();
    const [black, setBlack] = useState();
    const socket = useState(io(authContext.server))[0];

    // on dismount disconnect socket
    useEffect(() => () => socket.disconnect(), [socket]);

    // connect to the game channel
    useEffect(() => {
        socket.emit('joinGameRoom', {
            game_uuid: game_uuid,
            token: authContext.auth
        });
    }, [game_uuid, socket, authContext.auth]);

    
    // on mount check if this is my game
    useEffect(() => {
        let mounted = true;

        axioAW({
            method: 'get',
            url: '/game/info/players/' + game_uuid
        }, authContext)
        .then((res) => {
            if (!mounted) return;
            setWhite(res.data.white);
            setBlack(res.data.black);
        })
        .catch((err) => {
            if (!mounted) return;
            if(err.response !== undefined && err.response.status === 403)
                setForbidden(true)
        })

        return () => mounted = false;
    }, [authContext, game_uuid]);


    if (forbidden)
        navigation.navigate('home');
    
    
    return (
        <View>
            <View>
                <Button onPress={() =>{
                            setRefresh(true);
                            navigation.navigate('home');
                        } }>
                    <Text>Home</Text>
                </Button>
            </View>
            <PlayGame socket={socket} game_uuid={game_uuid} white={white} black={black} />
        </View>
    );
}