import React from 'react';

import {Item, Label, Input} from 'native-base';

export default function LoginForm() {

    return (
        <>
            <Item floatingLabel>
                <Label>Server</Label>
                <Input name='server'/>
            </Item>
            <Item floatingLabel>
                <Label>Username</Label>
                <Input name='username'/>
            </Item>
            <Item floatingLabel>
                <Label>Password</Label>
                <Input name='password'/>
            </Item>
        </>
    );
}
