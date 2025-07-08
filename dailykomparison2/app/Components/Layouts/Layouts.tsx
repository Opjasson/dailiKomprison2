import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Button from "@/app/Components/Moleculs/Button";
import _ from "lodash";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import React, { useEffect, useState } from "react";

interface props {
    navigation?: NavigationProp<any, any>;
    navigateHome: () => void;
    navigateInput: () => void;
    navigateNote: () => void;
    navigateRanking: () => void;
    navigateSetAkun: () => void;
}

const Layouts: React.FC<props> = ({
    navigateHome,
    navigateInput,
    navigateNote,
    navigateRanking,
    navigateSetAkun,
}) => {
    const [id, setId] = useState<number>()
    const [idLogin, setIdLogin] = useState<number>()
    const [user, setUser] = useState<string>()

    const navigation = useNavigation();

    const getUserId = async () => {
        const response = await fetch("http://192.168.106.220:8000/login");
        const data = await response.json();
        setIdLogin(Object.values(data)[0]?.id);
        setId(Object.values(data)[0]?.userId);
    }
    
    useEffect(() => {
        getUserId()
    },[])

    const getAkunLoggin = async () => {
        const response = await fetch(`http://192.168.106.220:8000/user/${id}`);
        const user = await response.json();        
        setUser(user.username)
    }

    const logOut = async () => {
        await fetch(`http://192.168.106.220:8000/login/${idLogin}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        navigation.navigate("Login" as never);
    }

    getAkunLoggin()
    return (
        <View>
            <View style={styles.navbar}>
                <FontAwesome
                    name="user"
                    size={50}
                    color="black"
                    style={{ textAlign: "center", paddingTop: 8 }}
                />
                <View>
                    <Text style={styles.textNav}>Hello</Text>
                    <Text style={styles.textUser}>{user}</Text>
                </View>

                <Button aksi={logOut} style={styles.buttonLogout}>Logout</Button>
            </View>

            <View style={styles.topBar}>
                <Button
                    styleTitle={{ color: "white", fontWeight: 800 }}
                    simbol={<Entypo name="home" size={24} color="black" />}
                    aksi={navigateHome}
                    style={styles.button}>
                    HOME
                </Button>

                <Button
                    styleTitle={{ color: "white", fontWeight: 800 }}
                    simbol={<Entypo name="pencil" size={24} color="black" />}
                    aksi={navigateInput}
                    style={styles.button}>
                    INPUT
                </Button>
                <Button
                    styleTitle={{ color: "white", fontWeight: 800 }}
                    simbol={
                        <FontAwesome5 name="book" size={24} color="black" />
                    }
                    aksi={navigateNote}
                    style={styles.button}>
                    Note
                </Button>

                <Button
                    styleTitle={{ color: "white", fontWeight: 800 }}
                    simbol={
                        <FontAwesome6
                            name="ranking-star"
                            size={24}
                            color="black"
                        />
                    }
                    aksi={navigateRanking}
                    style={styles.button}>
                    RANKING
                </Button>

                <Button
                    styleTitle={{ color: "white", fontWeight: 800 }}
                    simbol={
                        <MaterialCommunityIcons
                            name="account-settings"
                            size={28}
                            color="black"
                        />
                    }
                    aksi={navigateSetAkun}
                    style={styles.button}>
                    Set Akun
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonLogout: {
        backgroundColor: "red",
        padding: 8,
        alignItems: "center",
        borderRadius: 9,
        flexDirection: "row",
        gap: 5,
        marginBottom: 20,
        marginLeft : 200,
    },
    buttonDate: {
        borderWidth: 1,
        width: 130,
        flexDirection: "row",
        gap: 5,
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        backgroundColor: "#CFFFE2",
    },
    headInfo: {
        borderRadius: 15,
        padding: 5,
        paddingHorizontal: 10,
        paddingBottom: 19,
        backgroundColor: "#3bb9f7",
        gap: 8,
    },
    textNav: {
        fontSize: 25,
        fontWeight: "500",
    },
    textUser: {
        fontSize: 15,
    },
    navbar: {
        padding: 7,
        marginBottom: 26,
        backgroundColor: "#ffff",
        flexDirection: "row",
        gap: 5,
        borderBottomWidth: 1.5,
        elevation: 5,
    },
    container: {
        flex: 1,
    },
    buttonCetak: {
        backgroundColor: "#97B067",
        width: 50,
        borderWidth: 1,
        marginLeft: 15,
        marginBottom: 15,
        padding: 3,
        borderRadius: 5,
    },
    button: {
        backgroundColor: "#3bb9f7",
        padding: 8,
        alignItems: "center",
        borderRadius: 9,
        flexDirection: "row",
        gap: 5,
        marginBottom: 20,
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 30,
        flexWrap: "wrap",
        width: 370,
        marginHorizontal: "auto",
    },
    contentCon: {
        width: 400,

        marginHorizontal: 5,
        borderRadius: 2,
        marginBottom: 10,
    },
});

export default Layouts;
