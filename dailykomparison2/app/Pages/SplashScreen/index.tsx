import Button from "@/app/Components/Moleculs/Button";
import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { BackgroundSP } from "../../Inventory/image";

interface props {
    navigation: NavigationProp<any, any>;
}

const SplashScreen: React.FC<props> = ({ navigation }) => {
    return (
        <View style={styles.area}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View style={styles.container}>
                <View>
                    <Image style={styles.imgLogo} source={BackgroundSP} />
                    <Text
                        style={{
                            textAlign: "center",
                            color: "#363636",
                            fontWeight: "600",
                        }}>
                        Daily Comparison
                    </Text>
                </View>
                <Button
                    style={styles.button}
                    aksi={() => navigation.navigate("Register")}>
                    Get Started
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bgSplash: {
        flex: 1,
        justifyContent: "center",
    },
    area: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    imgLogo: {
        height: 200,
        width: 300,
    },
    container: {
        height: 500,
        justifyContent: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 9,
        position: "relative",
    },
    button: {
        backgroundColor: "#111",
        width: 200,
        padding: 8,
        borderRadius: 10,
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        left: 50,
    },
    onText: {
        fontSize: 25,
        fontStyle: "italic",
        fontWeight: 900,
        color: "black",
        marginHorizontal: "auto",
    },
});

export default SplashScreen;
