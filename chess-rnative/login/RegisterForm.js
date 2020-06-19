import React, { useRef, useState } from 'react';

import {Item, Label, Input} from 'native-base';

export default function RegisterForm({ passRef, validPassRef }) {

    return (
        <>
            <Item floatingLabel>
                <Label>Server</Label>
                <Input name='server'/>
            </Item>
            <Item floatingLabel>
                <Label>Mail</Label>
                <Input name='mail'/>
            </Item>
            <Item floatingLabel>
                <Label>Username</Label>
                <Input name='username'/>
            </Item>
            <Item floatingLabel>
                <Label>Password</Label>
                <Input innerRef={passRef} name='password'/>
            </Item>
            <Item floatingLabel>
                <Label>Repeat Password</Label>
                <Input innerRef={validPassRef} />
            </Item>          
        </>
    );
}