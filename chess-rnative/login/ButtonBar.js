import React from 'react';

import { StyleSheet } from 'react-native';
import { View, Button, Text, Grid, Col } from 'native-base';

function ButtonBarLogin({ changeForm, action }) {
    return (
            <Grid>
                <Col>
                    <Button info style={styles.button} onPress={() => action()}>
                        <Text>Login</Text>
                    </Button>
                </Col>
                <Col>
                    <Button light style={styles.button} onPress={() => changeForm()}>
                        <Text>Register</Text>
                    </Button>
                </Col>
            </Grid>
    );
}

function ButtonBarRegistration({ changeForm, action }) {
    return (
            <Grid>
                <Col>
                    <Button light style={styles.button} onPress={() => changeForm()}>
                        <Text>Login</Text>
                    </Button>
                </Col>
                <Col>
                    <Button info style={styles.button} onPress={() => action()}>
                        <Text>Register</Text>
                    </Button>
                </Col>
            </Grid>
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
    button: {
        margin: 10
    }
  });