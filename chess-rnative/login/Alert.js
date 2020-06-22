import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';


export default function Alert({ response }) {

    if (response.status !== null)
        return (
            <View style={styles.alert}>
                <Text style={styles.text}>{response.message}</Text>
            </View>
        );
    else
        return null;
}

const styles = StyleSheet.create({
    alert: {
        flex: 1,
        backgroundColor: '#f08080',
        alignContent: 'center',
        marginTop: 30,
        marginLeft: 40,
        marginRight: 40
    },
    text: {
        textAlign: 'center',
        margin: 10
    }
  });