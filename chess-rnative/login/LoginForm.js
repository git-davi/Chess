import React from 'react';

import {Item, Label, Input, View} from 'native-base';

import { setAttribute } from './util/utils';
import { StyleSheet } from 'react-native';

export default function LoginForm({ data, setData }) {

    return (
        <>
            <Item floatingLabel>
                <Label style={styles.labels}>Server</Label>
                <Input 
                    style={styles.labels} 
                    onChangeText={(val) => setAttribute("server", "http://192.168.1.163:3000", data, setData)} />
            </Item>
            <Item floatingLabel>
                <Label style={styles.labels}>Username</Label>
                <Input 
                    style={styles.labels}
                    onChangeText={(val) => setAttribute("username", val, data, setData)} />
            </Item>
            <Item floatingLabel>
                <Label style={styles.labels}>Password</Label>
                <Input 
                    secureTextEntry
                    style={styles.labels}
                    onChangeText={(val) => setAttribute("password", val, data, setData)} />
            </Item>
        </>
    );
}

const styles = StyleSheet.create({
    labels: {
        color: '#fff'
    }
});