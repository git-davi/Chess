import React, { useContext } from 'react';
import { AuthContext } from '../App';

import NavBar from './NavBar';
//import GameRoom from './play/GameRoom';

import { Container } from 'native-base';
import { ScrollView, StyleSheet } from 'react-native';


export default function Room({ route, navigation }) {

    const value = useContext(AuthContext);

    console.log(route.params)

    return (
        <Container style={styles.container}>
            <ScrollView style={styles.views}>
                <NavBar refresh={value.refresh} setRefresh={value.setRefresh} />
            </ScrollView>
        </Container>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#484849',
    },
    views: {
      margin: 20
    }
  });