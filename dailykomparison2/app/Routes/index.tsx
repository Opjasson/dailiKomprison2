import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    Home,
    Input,
    Ranking,
    Register,
    UpdatePage,
    SplashScreen,
    Login,
    Note,
    SetAkun,
    UbahAkun,
    TambahAkun,
    Jadwal,
    TambahJadwal,
} from "../Pages";

const Stack = createStackNavigator();

const Route = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Register" component={Register} /> */}
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Input" component={Input} />
            <Stack.Screen name="Rank" component={Ranking} />
            <Stack.Screen name="Update" component={UpdatePage} />
            <Stack.Screen name="Note" component={Jadwal} />
            <Stack.Screen name="SetAkun" component={SetAkun} />
            <Stack.Screen name="UbahAkun" component={UbahAkun} />
            <Stack.Screen name="TambahAkun" component={TambahAkun} />
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: "Tambah jadwal",
                }}
                name="TambahJadwal"
                component={TambahJadwal}
            />
        </Stack.Navigator>
    );
};

export default Route;
