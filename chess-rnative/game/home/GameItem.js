import React, { useContext } from 'react';
import { View, Text, Button, Icon, Grid, Col, Card } from 'native-base'
import { StyleSheet } from 'react-native';

import {AuthContext} from '../../App';
import {axiosAuthWrapper as axiosAW} from '../util/axiosAuthWrapper';


export default function GameItem( { game, name, setRefresh, navigation }) {

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
        <View style= {styles.margin}>
            <Card style={styles.Cards}>
            <Grid>
                <Col style={styles.marginAll}>
                    <Icon name={'logo-game-controller-b'} style={{color: '#805500'}}></Icon>
                </Col>
                <Col>
                    <Text style={styles.Info}>Game : {name}</Text>
                </Col>
                <Col style={styles.widths}>
                    <Button style ={styles.button} 
                            iconLeft 
                            success 
                            onPress={() => navigation.push('room', {game_uuid: game})}>
                        <Icon name={'ios-play'}></Icon>
                    </Button>
                </Col>
                <Col style={styles.widths}>
                    <Button style = {styles.button} danger onPress={() => surrend()}>
                        <Icon name={"ios-flag"}></Icon>
                    </Button>
                </Col>
            </Grid>
            </Card>
        </View>
        
    );
}

const styles = StyleSheet.create({
    Info: {
       // color: 'white',
       // textAlign: 'center',
        //flex: 1
        marginTop:"8%",
        color: '#805500',

    },

    Cards: {
        backgroundColor: '#ffe6b3' 
      },

    statusBad: {
        color: 'red',
        fontStyle: 'italic',
        textAlign: 'center',
        flex: 1
    }, 

    button: {
    //marginLeft:"2%",
    width:'90%',
    },
    margin:{
        padding: '1%'
    },
    widths:{
        width: '15%',
    },

    marginAll: {
        marginTop: '2%',
        width: '15%',
        marginLeft: '1%'
    }
  });