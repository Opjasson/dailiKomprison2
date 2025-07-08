import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Alert,
} from "react-native";
import Layouts from "@/app/Components/Layouts/Layouts";
import Button from "@/app/Components/Moleculs/Button";
import { NavigationProp } from "@react-navigation/native";

interface props {
    navigation: NavigationProp<any, any>;
}

const Jadwal: React.FC<props> = ({ navigation }) => {
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
                    Halaman jadwal
                </Text>
                <Text
                    style={{
                        borderBottomWidth: 2,
                        height: 0,
                        width: "70%",
                    }}></Text>
                <Text>Mengelola jadwal acara dan meeting</Text>
            </View>

            <Button
                aksi={() => navigation.navigate("TambahJadwal")}
                style={styles.button}>
                Tambah jadwal
            </Button>

            <View style={{ backgroundColor: "#E5E0D8", padding : 20, borderRadius : 20, width : "88%", marginHorizontal: "auto", gap : 10 }}>
                <Text style={{ fontSize : 15, textDecorationLine : "underline" }}>12-3-2025</Text>
                <Text style={{ borderBottomWidth : 3 }}>Staf : Ferri adi</Text>
                <Text style={{ fontSize : 18, fontWeight : "700" }}>Merancang strategi pekembangan hotel</Text>
                <Text>
                    Front office : memaksimalkan kinerja dan sopan santun f&b
                    division : catatan stok bahan baku masih kurang lengkap
                </Text>

                <Button aksi={() => alert("hallo")} style={styles.deleteCard} styleTitle={styles.deleteText}>Delete</Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    deleteText : {
        textAlign : "center",
        color : "white"
    },
    deleteCard : {
        backgroundColor : "red",
        width : 80,
        borderRadius : 10
    },
    headInfo: {
        borderRadius: 15,
        padding: 5,
        paddingHorizontal: 10,
        paddingBottom: 19,
        backgroundColor: "#3bb9f7",
        gap: 8,
        marginBottom: 30,
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
        backgroundColor: "#97B067",
        width: 130,
        padding: 8,
        alignItems: "center",
        borderRadius: 9,
        marginLeft: 10,
        marginBottom: 10,
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

export default Jadwal;
