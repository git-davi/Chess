import React from 'react';
import { StyleSheet } from 'react-native'
import {Item, Label, Input} from 'native-base';

import { setAttribute } from './util/utils';


export default function RegisterForm({ data, setData }) {

    return (
        <>
            <Item floatingLabel>
                <Label style={styles.labels}>Server</Label>
                <Input
                    style={styles.labels} 
                    onChangeText={(val) => setAttribute("server", "http://"+val, data, setData)} />
            </Item>
            <Item floatingLabel>
                <Label style={styles.labels}>Mail</Label>
                <Input
                    style={styles.labels}
                    textContentType="emailAddress" 
                    onChangeText={(val) => setAttribute("mail", val, data, setData)} />
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
                    style={styles.labels}
                    secureTextEntry 
                    onChangeText={(val) => setAttribute("password", val, data, setData)} />
            </Item>
            <Item floatingLabel>
                <Label style={styles.labels}>Repeat Password</Label>
                <Input
                    style={styles.labels}
                    secureTextEntry 
                    onChangeText={(val) => setAttribute("validpassword", val, data, setData)} />
            </Item>          
        </>
    );
}


const styles = StyleSheet.create({
    labels: {
        color: '#fff'
    }
});