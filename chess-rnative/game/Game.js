import React, { useState } from 'react';

import Room from './Room';
import Home from './Home';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StyleSheet } from 'react-native';
import { View } from 'native-base';


const Stack = createStackNavigator();
export const RefreshContext = React.createContext();


export default function Game() {
    const [refresh, setRefresh] = useState();
    
   return (
        <View style={styles.container}>
            <RefreshContext.Provider value={{
                refresh: refresh,
                setRefresh: setRefresh
            }}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="home">
                        <Stack.Screen name="room" component={Room}/>
                        <Stack.Screen name="home" component={Home}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </RefreshContext.Provider>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});