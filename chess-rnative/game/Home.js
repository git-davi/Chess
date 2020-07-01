import React, { useContext } from 'react';
import { AuthContext } from '../App';

import { Container } from 'native-base';

import NavBar from './NavBar';
import GamesHandler from './home/GamesHandler'
import { ScrollView, StyleSheet, StatusBar } from 'react-native';

export default function Home({ navigation }) {

    const value = useContext(AuthContext);

    return (
        <Container style={styles.container}>
            <ScrollView style={styles.views}>
                <NavBar refresh={value.refresh} setRefresh={value.setRefresh} />
                <GamesHandler refresh={value.refresh} setRefresh={value.setRefresh} navigation={navigation}/>
            </ScrollView>
        </Container>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#484849',
      marginTop: StatusBar.currentHeight,
    },
    views: {
      margin: 20
    }
  });