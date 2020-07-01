import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, Container, Card, Grid, Col, Icon } from 'native-base'

import {AuthContext} from '../App';
import {TOKEN_KEY} from '../storageKeys';
import {axiosAuthWrapper as axiosAW} from './util/axiosAuthWrapper';
import parseJwt from './util/parseJwt';
import logout from './util/logout';
import { StyleSheet } from 'react-native';


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
        <View style={styles.margin}>
             <Grid style={styles.grid}>
                <Col>
                    <View style={styles.buttonView}>
                    <Button warning iconLeft style={styles.button}>
                        <Icon name= {'ios-person'}></Icon>
                        <Text style= {styles.User}>{userInfo.username}</Text>
                    </Button >
                    </View>
                </Col>
                <Col>
                    <View style={styles.buttonView}>
                    <Button iconLeft style={styles.buttonElo}>
                        <Icon name= {'ios-podium'}></Icon>
                        <Text style= {styles.Elo}>{userInfo.elo}</Text>
                    </Button >
                    </View>
                </Col>
                    <View style={styles.buttonView}>
                        <Button danger iconLeft onPress={() => logout(authContext, TOKEN_KEY)}>
                            <Icon name = {'ios-log-out'}></Icon>
                            <Text>Logout</Text>
                        </Button>
                    </View>
                </Grid>
        </View>
    );
}

const styles = StyleSheet.create({
    User: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'right',
        fontSize: 14,
        flex: 1
    },

    Elo: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15,
        flex: 1
    },
    button: {
    alignSelf: 'stretch',
    alignContent: "space-between",
    flex: 2,
    },
    buttonElo: {
        alignSelf: 'stretch',
        backgroundColor: "#11d5d5",
        alignContent: "space-between",
        flex:1,
        },
    grid: {
        alignContent: "space-between"
    },
    buttonView: {
        padding :1,

    },
    margin:{
        marginBottom:'10%'
    }
  });