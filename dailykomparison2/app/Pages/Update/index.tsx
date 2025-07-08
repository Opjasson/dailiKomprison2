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
import { Picker } from "@react-native-picker/picker";
import Layouts from "@/app/Components/Layouts/Layouts";

interface props {
    navigation: NavigationProp<any, any>;
    route: RouteProp<any, any>;
}

const UpdatePage: React.FC<props> = ({ navigation, route }) => {
    // Get id menggunakan params di previos page
    const index = route.params?.id;
    const sendData = route.params?.data;

    // State = Penyimpanan data sementara
    const [data, setData] = useState(sendData);

    const [hotel, setHotel] = useState(sendData.hotel);
    const [RNO, setRNO] = useState<number>(sendData.RNO);
    const [ARR, setARR] = useState<number>(sendData.ARR);
    const [RNA, setRNA] = useState<number>(sendData.RNA);
    const [RR, setRR] = useState<number>();
    const [id, setId] = useState<number>();

    // End state

    interface RootStackParamList {
        Home: undefined;
    }
    // End Interface

    const getUserId = async () => {
        const response = await fetch("http://192.168.106.220:8000/login");
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

    // Handle alert sesudah berhasil update
    const pindahHal = useNavigation<NavigationProp<RootStackParamList>>();
    const info = () => {
        Alert.alert("Data Berhasil Dirubah", "Kembali Ke Home", [
            {
                text: "Home",
                onPress: () => pindahHal.navigate("Home"),
                style: "default",
            },
        ]);
    };

    const info2 = () => {
        Alert.alert("Data Berhasil Dihapus", "Kembali Ke Home", [
            {
                text: "Home",
                onPress: () => pindahHal.navigate("Home"),
                style: "default",
            },
        ]);
    };

    // Handle deleteButton
    const handleDelette = async () => {
        try {
            await fetch(`http://192.168.106.220:8000/data/${index}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            info2();
        } catch (error) {
            alert("Ups ada error.");
        }
    };

    // Handle updateButton
    const sendUpdate = async () => {
        try {
            const response = await fetch(
                `http://192.168.106.220:8000/data/${index}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        hotel: hotel,
                        RNO: RNO,
                        ARR: ARR,
                        RNA: RNA,
                    }),
                }
            );
            const json = await response.json();
            setData(json);
        } catch (error) {
            alert("ada error nih");
        }
        info();
    };

    // useEffect(() => {}, []);

    const settingRna = (value: string) => {
        switch (value) {
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
                    Halaman Ubah data
                </Text>
                <Text
                    style={{
                        borderBottomWidth: 2,
                        height: 0,
                        width: "70%",
                    }}></Text>
                <Text>Ubah data yang ingin dirubah</Text>
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
                                value={data.hotel}
                                label={data.hotel}
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
                        value={`${RNO}`}
                    />

                    <Text style={styles.textLabel}>ARR</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            marginBottom: 5,
                            borderRadius: 5,
                        }}
                        onChangeText={(text) => setARR(Number(text))}
                        value={`${ARR}`}
                        keyboardType="numeric"
                        placeholder="ARR"
                    />

                    <Text style={styles.textLabel}>RNA(Nilai Otomatis)</Text>
                    <TextInput
                        editable={false}
                        style={{
                            borderWidth: 1,
                            marginBottom: 5,
                            borderRadius: 5,
                            backgroundColor: "#d9d5d4",
                        }}
                        placeholder="RNA"
                        keyboardType="numeric"
                        value={String(RNA)}
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
                        value={`${RNO * ARR}`}
                    />
                </View>
                {/* End Form */}

                <Button
                    aksi={sendUpdate}
                    disabled={RNO && ARR && RNA ? false : true}
                    style={[
                        styles.button,
                        { marginHorizontal: "auto", width: 190, marginTop: 10 },
                    ]}>
                    Kirim
                </Button>

                <Button
                    aksi={handleDelette}
                    style={[
                        styles.button,
                        {
                            marginHorizontal: "auto",
                            width: 190,
                            marginTop: 10,
                            backgroundColor: "red",
                        },
                    ]}>
                    Delete
                </Button>
            </ScrollView>
        </View>
    );
};

// pemberian style/gaya supaya lebih menarik dan hidup
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

export default UpdatePage;
