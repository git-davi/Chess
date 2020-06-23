import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-native';
import { View, Text, Button } from 'native-base'

import {AuthContext} from '../App';
import {TOKEN_KEY} from '../storageKeys';
import {axiosAuthWrapper as axiosAW} from './util/axiosAuthWrapper';
import parseJwt from './util/parseJwt';
import logout from './util/logout';
import { AsyncStorage } from 'react-native';


export default function NavBar({ refresh, setRefresh }) {

    const authContext = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({});


    useEffect(() => {
        let mounted = true;
        try {
            var decodedToken = parseJwt(authContext.auth);
        } catch (err) {
            logout(authContext, TOKEN_KEY);
            return;
        }
        axiosAW({
            method: 'get',
            url: '/game/user/' + decodedToken.username,
        }, authContext)
        .then((res) => {
            if (!mounted) return;
            setUserInfo(res.data);
            setRefresh(false);
        })
        .catch((err) => console.log(err));

        return () => mounted = false;
    }, [authContext, setRefresh, refresh]);


    return (
        <View>
                <Text>{userInfo.username}</Text>
                <Text>{userInfo.elo}</Text>
                <View>
                    <Link to="/">
                        <Button onPress={() => logout(authContext, TOKEN_KEY)}>
                            <Text>Logout</Text>
                        </Button>
                    </Link>
                </View>
        </View>
    );
}