import Button from "@/app/Components/Moleculs/Button";
import Input from "@/app/Components/Moleculs/Input";
import Label from "@/app/Components/Moleculs/Label";
import { NavigationProp } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface props {
    navigation: NavigationProp<any, any>;
}

const ForgotPass: React.FC<props> = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [msgEmail, setMsgEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [userId, setUserId] = useState<number>();

    const cekEmail = async () => {
        const cek = await fetch("change-ip-addressWLX/forgotPass", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
            }),
        });
        const hasil = await cek.json();

        if (hasil) {
            setEmail(hasil.email);
            setUserId(hasil.id);
            setMsgEmail("Email benar. silahkan isi password baru");
        }
    };

    const handleChangePass = async () => {
        const response = await fetch(`change-ip-addressWLX/user/${userId}`, {
            method: "PATCH",
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
            alert("Berhasil merubah akun");
            navigation.navigate("Login");
        }
    };

    return (
        <View>
            <Text
                style={{
                    fontSize: 20,
                    borderBottomWidth: 3,
                    marginBottom: 30,
                }}>
                Halaman Lupa password
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ width: "80%" }}>
                    <Label title="Email" />
                    <Input
                        keyboardType="email-address"
                        onChangeText={(text) => setEmail(text)}
                        placeholder="Masukan email anda"
                    />
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: "yellow",
                        width: 50,
                        height: 40,
                        marginTop: 20,
                    }}
                    onPress={() => cekEmail()}>
                    <Text style={{ textAlign: "center" }}>Cek</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ color: "blue" }}>{msgEmail}</Text>

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
            <Text>{error}</Text>

            <Button aksi={() => handleChangePass()} style={styles.button}>
                Ubah
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#629DEA",
        width: "80%",
        paddingVertical: 15,
        alignItems: "center",
        borderRadius: 9,
        marginTop: 20,
        marginHorizontal: "auto",
    },
});

export default ForgotPass;
