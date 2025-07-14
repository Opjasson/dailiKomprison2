import Input from "@/app/Components/Moleculs/Input";
import Label from "@/app/Components/Moleculs/Label";
import { BackgroundSP } from "@/app/Inventory/image";
import { NavigationProp } from "@react-navigation/native";
import React, { useState } from "react";
import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface props {
    navigation: NavigationProp<any, any>;
}

const Register: React.FC<props> = ({ navigation }) => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confPassword, setConfPassword] = useState<string>();
    const [error, setError] = useState<string>();

    const handleRegister = async () => {
        if (email && password && confPassword) {
            const response = await fetch("http://192.168.18.77:8000/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    confPassword: confPassword,
                }),
            });

            if (JSON.stringify(response.status) === "400") {
                setError("Password dan confPassword tidak sama!");
            } else {
                alert("Berhasil membuat akun");
                navigation.navigate("Login");
            }
        } else {
            setError("Isi dengan lengkap!");
        }
    };

    return (
        <ScrollView style={{ position: "relative" }}>
            <StatusBar barStyle={"light-content"} backgroundColor={"#1F1F1F"} />
            <View style={styles.headPage}>
                <Image style={styles.logo} source={BackgroundSP} />
            </View>

            <View style={styles.containerForm}>
                <Text style={styles.loginTitle}>Register</Text>

                <Text style={error ? styles.errorMsg : styles.hidden}>
                    {error}
                </Text>

                <Label title="Email" />
                <Input
                    keyboardType="email-address"
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Masukan email anda"
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

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleRegister}>
                    <Text
                        style={{
                            color: "white",
                            fontSize: 15,
                            fontWeight: "900",
                        }}>
                        Register
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buatAkun}
                    onPress={() => navigation.navigate("Login")}>
                    <Text>Sudah punya akun? Login disini</Text>
                </TouchableOpacity>
            </View>
            {/* End Form */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    logo: {
        height: 150,
        width: 150,
        marginHorizontal: "auto",
    },
    headPage: {
        borderWidth: 3,
        borderBottomEndRadius: 50,
        borderBottomStartRadius: 50,
        paddingBottom: 40,
        backgroundColor: "#629DEA",
    },
    containerForm: {
        width: "85%",
        marginHorizontal: "auto",
        backgroundColor: "#F8F5F5",
        position: "absolute",
        top: 165,
        left: 30,
        paddingHorizontal: 10,
        paddingTop: 30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        elevation: 10,
    },
    loginTitle: {
        fontSize: 35,
        textAlign: "center",
        marginBottom: 30,
    },
    button: {
        backgroundColor: "#629DEA",
        width: "80%",
        paddingVertical: 15,
        alignItems: "center",
        borderRadius: 9,
        marginTop: 20,
        marginHorizontal: "auto",
    },
    buatAkun: {
        width: "80%",
        paddingVertical: 15,
        alignItems: "center",
        borderRadius: 9,
        marginHorizontal: "auto",
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
    errorMsg: {
        fontSize: 18,
        color: "red",
        textAlign: "center",
    },
    hidden: {
        display: "none",
    },
});

export default Register;
