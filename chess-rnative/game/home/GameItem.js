import React from 'react';
import { Link } from 'react-router-native';
import { View, Text, Button } from 'native-base'

import {AuthContext} from '../../App';
import {axiosAuthWrapper as axiosAW} from '../util/axiosAuthWrapper';


export default function GameItem( { game, name, setRefresh }) {

    // I could choose an api to generate random name for games instead of displaying uuid

    function surrend() {
        axiosAW({
            method: 'delete',
            url: '/game/surrend/' + game
        }, AuthContext)
        .catch(() => console.log('Failed to surrend'));

        setRefresh(true);
    }

    return (
        <View>
            <Text>Game : {name}</Text>
            <Link className="ml-auto" to={'/room/'+game}>
                <Button success>
                    <Text>Play</Text>
                </Button>
            </Link>
            <Button danger onClick={() => surrend()}>
                <Text>Surrend</Text>
            </Button>
        </View>
    );
}