import React, { useContext } from 'react';
import { Link } from 'react-router-native';
import { View, Text, Button } from 'native-base'

import {AuthContext} from '../../App';
import {axiosAuthWrapper as axiosAW} from '../util/axiosAuthWrapper';


export default function GameItem( { game, name, setRefresh }) {

    // I could choose an api to generate random name for games instead of displaying uuid
    const authContext = useContext(AuthContext);

    function surrend() {
        axiosAW({
            method: 'delete',
            url: '/game/surrend/' + game
        }, authContext)
        .catch(() => console.log('Failed to surrend'));

        setRefresh(true);
    }

    return (
        <View>
            <Text>Game : {name}</Text>
            <Link to={'/room/'+game}>
                <Button success>
                    <Text>Play</Text>
                </Button>
            </Link>
            <Button danger onPress={() => surrend()}>
                <Text>Surrend</Text>
            </Button>
        </View>
    );
}