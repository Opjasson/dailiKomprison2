import Layouts from "@/app/Components/Layouts/Layouts";
import Button from "@/app/Components/Moleculs/Button";
import { Picker } from "@react-native-picker/picker";
import {
    NavigationProp,
    RouteProp,
    useNavigation,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

interface props {
    navigation: NavigationProp<any, any>;
    route: RouteProp<any, any>;
}

const InputData: React.FC<props> = ({ navigation }) => {
    // State untuk menyimpan data sementara
    const [hotel, setHotel] = useState<string>();
    const [RNO, setRNO] = useState<number>();
    const [ARR, setARR] = useState<number>();
    const [RNA, setRNA] = useState<number>();
    // End state

    const [id, setId] = useState<number>();

    const getUserId = async () => {
        const response = await fetch("change-ip-addressWLX/login");
        const data = await response.json();
        setId(Object.values(data)[0]?.userId);
    };

    useEffect(() => {
        getUserId();
    }, []);

    useEffect(() => {
        if (id === 2) {
            navigation.navigate("Home");
        }
    });

    interface RootStackParamList {
        Home: undefined;
    }
    // End Interface

    // Handle alert sesudah berhasil update
    const pindahHal = useNavigation<NavigationProp<RootStackParamList>>();

    const info = () => {
        Alert.alert("Data Berhasil Ditambahkan", "Kembali Ke Home", [
            {
                text: "Home",
                onPress: () => pindahHal.navigate("Home"),
                style: "default",
            },
        ]);
    };

    // Handle updateButton
    const tambahData = async () => {
        try {
            await fetch(`change-ip-addressWLX/data`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    hotel: hotel,
                    RNO: RNO,
                    ARR: ARR,
                    RNA: RNA,
                }),
            });
        } catch (error) {
            alert("ada error nih");
        }
        info();
    };

    // setting otomatis RNA
    const settingRna = (value: string) => {
        switch (value) {
            case "undefined":
                setRNA(0);
                setHotel(value);
                break;

            case "Premier":
                setRNA(58);
                setHotel(value);
                break;

            case "Riez Palace":
                setRNA(91);
                setHotel(value);
                break;

            case "Karlita":
                setRNA(156);
                setHotel(value);
                break;

            case "Bahari Inn":
                setRNA(78);
                setHotel(value);
                break;

            case "Prime Biz":
                setRNA(99);
                setHotel(value);
                break;

            case "Khas":
                setRNA(98);
                setHotel(value);
                break;

            case "Plaza":
                setRNA(75);
                setHotel(value);
                break;

            case "Kotta Go":
                setRNA(52);
                setHotel(value);
                break;

            default:
                break;
        }
    };
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#03c0ff" barStyle="light-content" />
            <Layouts
                navigateHome={() => navigation.navigate("Home")}
                navigateInput={() => navigation.navigate("Input")}
                navigateNote={() => navigation.navigate("Note")}
                navigateRanking={() => navigation.navigate("Rank")}
                navigateSetAkun={() => navigation.navigate("SetAkun")}
            />

            <View style={styles.headInfo}>
                <Text style={{ fontSize: 26, fontWeight: "700" }}>
                    Halaman Input
                </Text>
                <Text
                    style={{
                        borderBottomWidth: 2,
                        height: 0,
                        width: "70%",
                    }}></Text>
                <Text>Lengkapi semua formulir yang ada</Text>
            </View>

            {/* Form Update */}
            <ScrollView>
                <View style={styles.containerForm}>
                    <Text style={styles.textLabel}>Hotel</Text>
                    <View
                        style={{
                            borderWidth: 1,
                            marginBottom: 5,
                            borderRadius: 5,
                        }}>
                        <Picker
                            selectedValue={hotel}
                            onValueChange={(value, index) => settingRna(value)}>
                            <Picker.Item
                                value={"undefined"}
                                label="Pilih Nama Hotel"
                            />
                            <Picker.Item value={"Premier"} label="Premier" />
                            <Picker.Item
                                value={"Riez Palace"}
                                label="Riez Palace"
                            />
                            <Picker.Item value={"Karlita"} label="Karlita" />
                            <Picker.Item
                                value={"Bahari Inn"}
                                label="Bahari Inn"
                            />
                            <Picker.Item
                                value={"Prime Biz"}
                                label="Prime Biz"
                            />
                            <Picker.Item value={"Khas"} label="Khas" />
                            <Picker.Item value={"Plaza"} label="Plaza" />
                            <Picker.Item value={"Kotta Go"} label="Kotta Go" />
                        </Picker>
                    </View>

                    <Text style={styles.textLabel}>RNO</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            marginBottom: 5,
                            borderRadius: 5,
                        }}
                        onChangeText={(text) => setRNO(Number(text))}
                        keyboardType="numeric"
                        placeholder="RNO"
                    />

                    <Text style={styles.textLabel}>ARR</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            marginBottom: 5,
                            borderRadius: 5,
                        }}
                        onChangeText={(text) => setARR(Number(text))}
                        keyboardType="numeric"
                        placeholder="ARR"
                    />

                    <Text style={styles.textLabel}>RNA(Nilai Otomatis)</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            marginBottom: 5,
                            borderRadius: 5,
                            backgroundColor: "#d9d5d4",
                        }}
                        editable={false}
                        value={String(RNA) === "undefined" ? "0" : String(RNA)}
                        placeholder="RNA"
                        keyboardType="numeric"
                    />

                    <Text style={styles.textLabel}>RR(Nilai Otomatis)</Text>
                    <TextInput
                        editable={false}
                        style={{
                            borderWidth: 1,
                            marginBottom: 5,
                            borderRadius: 5,
                            backgroundColor: "#d9d5d4",
                        }}
                        placeholder="RR"
                        keyboardType="numeric"
                        value={
                            String(RNO) === "undefined"
                                ? "0"
                                : String((RNO ?? 0) * (ARR ?? 0))
                        }
                    />
                </View>
                {/* End Form */}

                <Button
                    aksi={tambahData}
                    disabled={RNO && ARR && RNA ? false : true}
                    style={[
                        styles.button,
                        { marginHorizontal: "auto", width: 190, marginTop: 10 },
                    ]}>
                    Kirim
                </Button>
            </ScrollView>
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
        marginBottom: 10,
    },
    textNav: {
        fontSize: 25,
        fontWeight: "bold",
    },
    navbar: {
        padding: 7,
        marginBottom: 40,
        backgroundColor: "#03c0ff",
    },
    container: {
        flex: 1,
    },
    containerForm: {
        paddingHorizontal: 5,
    },
    button: {
        backgroundColor: "#03c0ff",
        width: 100,
        padding: 8,
        alignItems: "center",
        borderRadius: 9,
        color: "black",
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

export default InputData;
