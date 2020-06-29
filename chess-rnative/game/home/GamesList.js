import React, { useContext, useEffect, useState } from 'react';

import GameItem from './GameItem';

import {AuthContext} from '../../App';
import {axiosAuthWrapper as axiosAW} from '../util/axiosAuthWrapper';

import { View, Text, Button, Icon, Grid, Col} from 'native-base'
import { StyleSheet } from 'react-native';


export default function GamesList({games, setGames, refresh, setRefresh, navigation}) {

    const authContext = useContext(AuthContext);


    useEffect(() => {
        let mounted = true;
        axiosAW({
            method: 'get',
            url: '/game/games',
        }, authContext)
        .then((res) => {
            if(!mounted) return;
            setGames(res.data.games);
            setRefresh(false);
        })
        .catch((err) => console.log(err.response));

        return () => mounted = false;
    }, [authContext, setGames, refresh, setRefresh]);

    
    return (
        <View>
            <View>
                <Grid>
                    <Col style={styles.widths}>
                        <Icon name="ios-list"></Icon>
                    </Col>
                    <Col>
                        <Text style={styles.Info}>Games List</Text>
                    </Col>
                    <Col style={styles.widthsRef}>
                        <Button iconLeft style={styles.button} onPress={() => setRefresh(true)}>
                            <Icon name={'ios-refresh'}></Icon>
                        </Button>
                    </Col>
                </Grid>
            </View>
            {games.map((game) => <GameItem  key={game.game_uuid} 
                                            game={game.game_uuid} 
                                            name={game.name} 
                                            setRefresh={setRefresh}
                                            navigation={navigation}/>)}
        </View>
    );
}

const styles = StyleSheet.create({
    Info: {
        //textAlign: 'center',
        fontSize: 20,
        flex: 1,
        marginTop: '2%'
    },

    statusGood: {
        color: 'green',
        fontStyle: 'italic',
        textAlign: 'center',
        flex: 1
    },

    statusBad: {
        color: 'red',
        fontStyle: 'italic',
        textAlign: 'center',
        flex: 1
    }, 

    button: {
    marginRight:"23%",
   // width:'35%',
    backgroundColor:'#00ace6'
    },

    margin:{
        marginVertical:'4%'
    },

    widths:{
        width: '10%',
        marginLeft: '1%',
    },

    widthsRef:{
        width: '20%',
    },

    marginAll: {
        marginBottom: '2%'
    }
  });