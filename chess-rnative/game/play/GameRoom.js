import React, { useEffect, useContext, useState } from 'react';

import PlayGame from './PlayGame';

import { axiosAuthWrapper as axioAW } from '../util/axiosAuthWrapper';
import { AuthContext } from '../../App';

import io from 'socket.io-client';
import { View, Button, Text, Card, Icon, Grid, Col, Row } from 'native-base';
import { StyleSheet } from 'react-native';

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
                <Card style={styles.padding}>
                    <Grid>
                        <Col size={3}>
                            <Row>
                                <Button style = {styles.buttonWhite} disabled bordered iconLeft>
                                    <Icon style={{color: 'black'}} name= {'ios-person'}></Icon>
                                    <Text style={{color: 'black'}}>{ white }</Text>
                                </Button>
                            </Row>
                            <Row>
                                <Button style = {styles.buttonBlack} disabled iconLeft>
                                    <Icon name= {'ios-person'}></Icon>
                                    <Text>{ black }</Text>
                                </Button>
                            </Row>
                        </Col>
                        <Col size={1}>
                            <Button style = {styles.buttonHome} onPress={() =>{
                                setRefresh(true);
                                navigation.navigate('home');
                            } } large >
                                <Icon name={"ios-home"}></Icon>
                            </Button>
                        </Col>
                    </Grid>
                </Card>
            </View>
            <View style={styles.chessboard}>
                <PlayGame   socket={socket} 
                            game_uuid={game_uuid} 
                            white={white} 
                            black={black} />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({

    buttonHome: {
        backgroundColor:'#a9a9a9',
        justifyContent:"center",
    },

    buttonWhite: {
        backgroundColor:'white',
        justifyContent:"center"
    },

    buttonBlack: {
        backgroundColor:'black',
        justifyContent:"center"
    },

    margin:{
        margin: '5%',
    },

    padding: {
        padding: '5%',
        paddingBottom: '10%'
    },

    chessboard: {
        marginTop: '10%'
    }

  });