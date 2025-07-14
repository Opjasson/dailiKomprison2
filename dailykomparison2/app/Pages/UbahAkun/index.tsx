import {
    NavigationProp,
    RouteProp,
    useNavigation,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    ScrollView,
    Alert,
    StatusBar,
} from "react-native";
import Button from "@/app/Components/Moleculs/Button";
import Layouts from "@/app/Components/Layouts/Layouts";
import Label from "@/app/Components/Moleculs/Label";
import Input from "@/app/Components/Moleculs/Input";

interface props {
    navigation: NavigationProp<any, any>;
    route: RouteProp<any, any>;
}

const UbahAkun: React.FC<props> = ({ navigation, route }) => {
    // Get id menggunakan params di previos page
    const index = route.params?.id;
    const sendData = route.params?.data;

    const [email, setEmail] = useState<string>(sendData.email);
    const [username, setUsername] = useState<string>(sendData.username);
    const [password, setPassword] = useState<string>();
    const [confPassword, setConfPassword] = useState<string>();
    const [error, setError] = useState<string>();

    const handleUbah = async (id: number) => {
        if (email && password && confPassword) {
            const response = await fetch(
                `http://192.168.18.77:8000/user/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        username: username,
                        password: password,
                        confPassword: confPassword,
                    }),
                }
            );

            if (JSON.stringify(response.status) === "400") {
                setError("Password dan confPassword tidak sama!");
            } else {
                alert("Berhasil merubah akun");
                navigation.navigate("SetAkun");
            }
        } else {
            setError("Isi dengan lengkap!");
        }
    };

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
                    Halaman Ubah akun
                </Text>
                <Text
                    style={{
                        borderBottomWidth: 2,
                        height: 0,
                        width: "70%",
                    }}></Text>
                <Text>Ubah akun yang ingin dirubah</Text>
            </View>

            {/* Form Update */}
            <ScrollView>
                <View style={styles.containerForm}>
                    <Text style={error ? styles.errorMsg : styles.hidden}>
                        {error}
                    </Text>

                    <Label title="Email" />
                    <Input
                        keyboardType="email-address"
                        onChangeText={(text) => setEmail(text)}
                        placeholder="Masukan email anda"
                        value={`${email}`}
                    />

                    <Label title="Username" />
                    <Input
                        keyboardType="default"
                        onChangeText={(text) => setUsername(text)}
                        placeholder="Masukan username anda"
                        value={`${username}`}
                    />

                    <Label title="Password" />
                    <Input
                        keyboardType="default"
                        onChangeText={(text) => setPassword(text)}
                        placeholder="Masukan password anda"
                        secureTextEntry={true}
                    />

                    <Label title="Confirm Password" />
                    <Input
                        keyboardType="default"
                        onChangeText={(text) => setConfPassword(text)}
                        placeholder="Masukan ulang password anda"
                        secureTextEntry={true}
                    />
                </View>
                {/* End Form */}

                <Button
                    aksi={() => handleUbah(index)}
                    style={[
                        styles.button,
                        { marginHorizontal: "auto", width: 190, marginTop: 10 },
                    ]}>
                    Ubah akun
                </Button>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    hidden: {
        display: "none",
    },
    errorMsg: {
        fontSize: 18,
        color: "red",
        textAlign: "center",
    },
    headInfo: {
        borderRadius: 15,
        padding: 5,
        paddingHorizontal: 10,
        paddingBottom: 19,
        backgroundColor: "#3bb9f7",
        gap: 8,
        marginBottom: 10,
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
    containerForm: {
        paddingHorizontal: 5,
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
    textLabel: {
        fontWeight: "bold",
        fontSize: 18,
        paddingHorizontal: 3,
    },
});

export default UbahAkun;
