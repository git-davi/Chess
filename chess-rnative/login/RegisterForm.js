import React from 'react';

import {Item, Label, Input} from 'native-base';
import { setAttribute } from './util/utils';


export default function RegisterForm({ data, setData }) {

    return (
        <>
            <Item floatingLabel>
                <Label>Server</Label>
                <Input onChangeText={(val) => setAttribute("server", "http://"+val, data, setData)} />
            </Item>
            <Item floatingLabel>
                <Label>Mail</Label>
                <Input
                    textContentType="emailAddress" 
                    onChangeText={(val) => setAttribute("mail", val, data, setData)} />
            </Item>
            <Item floatingLabel>
                <Label>Username</Label>
                <Input onChangeText={(val) => setAttribute("username", val, data, setData)} />
            </Item>
            <Item floatingLabel>
                <Label>Password</Label>
                <Input
                    secureTextEntry 
                    onChangeText={(val) => setAttribute("password", val, data, setData)} />
            </Item>
            <Item floatingLabel>
                <Label>Repeat Password</Label>
                <Input
                    secureTextEntry 
                    onChangeText={(val) => setAttribute("validpassword", val, data, setData)} />
            </Item>          
        </>
    );
}