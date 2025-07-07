import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, Input, Ranking, Register, UpdatePage, SplashScreen, Login, Note, SetAkun } from "../Pages";


const Stack = createStackNavigator();


const Route = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} /> */}
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Input" component={Input} />
            <Stack.Screen name="Rank" component={Ranking} />
            <Stack.Screen name="Update" component={UpdatePage} />
            <Stack.Screen name="Note" component={Note} />
            <Stack.Screen name="SetAkun" component={SetAkun} />
        </Stack.Navigator>
    );
};

export default Route;
