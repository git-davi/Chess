import React from 'react';

import { StyleSheet } from 'react-native';
import { View, Button, Text } from 'native-base';

function ButtonBarLogin({ changeForm, action }) {
    return (
            <View>
                <Button onPress={() => action()}>
                    <Text>Login</Text>
                </Button>
                <Button onPress={() => changeForm()}>
                    <Text>Register</Text>
                </Button>
            </View>
    );
}

function ButtonBarRegistration({ changeForm, action }) {
    return (
            <View>
                <Button onPress={() => changeForm()}>
                    <Text>Login</Text>
                </Button>
                <Button onPress={() => action()}>
                    <Text>Register</Text>
                </Button>
            </View>
    );
}


export default function ButtonBar({ changeForm, form, action }) {

    return (
        <View style={styles.buttonBar}>
            { form === 'login' 
                ? <ButtonBarLogin changeForm={changeForm} action={action}/>
                : <ButtonBarRegistration changeForm={changeForm} action={action}/> 
            }
        </View>
    );
}


const styles = StyleSheet.create({
    buttonBar: {
        marginTop: 30,
    },
  });