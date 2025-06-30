import React from "react";
import { StatusBar, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationIndependentTree } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, Input, Ranking, splashScreen } from "../Pages";
import inputData from "../Pages/Input";
import updatePage from "../Pages/Update/updatePage";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Route = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SplashScreen" component={splashScreen} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Input" component={inputData} />
            <Stack.Screen name="Rank" component={Ranking} />
            <Stack.Screen name="Update" component={updatePage} />
        </Stack.Navigator>
    );
};

export default Route;
