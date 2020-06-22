import React from 'react';
import NForm from './NForm';

import { StyleSheet } from 'react-native';
import { Text, View } from 'native-base';


export default function Login() {

    return (
        <View>
            <Text style={styles.title}>chess.unimore</Text>
            <NForm />
        </View>
    );
}


const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50,
        color: '#fff'
    },
  });