import React from 'react';

import { View, Text } from 'native-base';


export default function Alert({ response }) {

    return (
        <View>
        { response.status !== null && <Text>{response.message}</Text> }
        </View>
    );
}