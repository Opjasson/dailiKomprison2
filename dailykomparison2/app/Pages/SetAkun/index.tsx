import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import Layouts from "@/app/Components/Layouts/Layouts";
import Button from "@/app/Components/Moleculs/Button";
import { NavigationProp } from "@react-navigation/native";

interface props {
    navigation: NavigationProp<any, any>;
}

const SetAkun: React.FC<props> = ({ navigation }) => {
    const [user, setUser] = useState([]);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#3bb9f7" barStyle="light-content" />
            <Layouts
                navigateHome={() => navigation.navigate("Home")}
                navigateInput={() => navigation.navigate("Input")}
                navigateNote={() => navigation.navigate("Note")}
                navigateRanking={() => navigation.navigate("Rank")}
                navigateSetAkun={() => navigation.navigate("SetAkun")}
            />

            <View style={styles.headInfo}>
                <Text style={{ fontSize: 26, fontWeight: "700" }}>
                    Setting akun
                </Text>
                <Text
                    style={{
                        borderBottomWidth: 2,
                        height: 0,
                        width: "70%",
                    }}></Text>
                <Text>Buat akun FO baru</Text>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    borderBottomWidth: 2,
                    justifyContent: "space-between",
                    width: "85%",
                    marginHorizontal: "auto",
                }}>
                <Text style={{ fontSize: 18, width: "40%" }}>Email</Text>
                <Text style={{ fontSize: 18, width: "60%" }}>Aksi</Text>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    borderBottomWidth: 2,
                    justifyContent: "space-between",
                    width: "85%",
                    marginHorizontal: "auto",
                }}>
                <Text style={{ fontSize: 18, width: "40%" }}>Email</Text>
                <Text style={{ fontSize: 18, width: "60%" }}>Aksi</Text>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    headInfo: {
        borderRadius: 15,
        padding: 5,
        paddingHorizontal: 10,
        paddingBottom: 19,
        backgroundColor: "#3bb9f7",
        gap: 8,
        marginBottom: 60,
    },
    textNav: {
        fontSize: 25,
        fontWeight: "bold",
    },
    navbar: {
        padding: 7,
        marginBottom: 40,
        backgroundColor: "#3bb9f7",
    },
    container: {
        flex: 1,
    },
    button: {
        backgroundColor: "#3bb9f7",
        width: 100,
        padding: 8,
        alignItems: "center",
        borderRadius: 9,
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 30,
    },
    contentCon: {
        width: 400,
        borderWidth: 2,
        marginHorizontal: "auto",
        borderRadius: 2,
    },
    containerRank: {
        flex: 1,
    },
    headRank: {
        alignItems: "center",
        marginBottom: 20,
        backgroundColor: "#edeae4",
        paddingVertical: 3,
        elevation: 2,
    },
    textHead: {
        fontSize: 20,
        fontWeight: "bold",
    },
    mainRank: {
        flexDirection: "row",
        justifyContent: "space-around",
        borderBottomWidth: 2,
        borderColor: "#edebe8",
        paddingBottom: 5,
    },
    textRank: {
        textAlign: "left",
        width: 90,
    },
});
export default SetAkun;
