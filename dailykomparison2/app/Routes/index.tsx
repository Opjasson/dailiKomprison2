import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, Input, Ranking, UpdatePage, splashScreen } from "../Pages";


const Stack = createStackNavigator();


const Route = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SplashScreen" component={splashScreen} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Input" component={Input} />
            <Stack.Screen name="Rank" component={Ranking} />
            <Stack.Screen name="Update" component={UpdatePage} />
        </Stack.Navigator>
    );
};

export default Route;
