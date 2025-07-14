import Button from "@/app/Components/Moleculs/Button";
import { Picker } from "@react-native-picker/picker";
import { NavigationProp } from "@react-navigation/native";
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
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Fontisto from "@expo/vector-icons/Fontisto";

interface props {
    navigation: NavigationProp<any, any>;
}

const TambahJadwal: React.FC<props> = ({ navigation }) => {
    const [date, setDate] = useState<string>();
    const [title, setTitle] = useState<string>();
    const [deskripsi, setDeskripsi] = useState<string>();
    const [staf, setStaf] = useState<string>();

    const [id, setId] = useState<number>();
    const [idLogin, setIdLogin] = useState<number>();
    const [user, setUser] = useState<string>();

    const getUserId = async () => {
        const response = await fetch("http://192.168.220.220:8000/login");
        const data = await response.json();
        setId(Object.values(data)[0]?.userId);
    };

    useEffect(() => {
        getUserId();
    }, []);

    const getAkunLoggin = async () => {
        const response = await fetch(`http://192.168.220.220:8000/user/${id}`);
        const user = await response.json();
        setUser(user.username);
    };

    useEffect(() => {
        getUserId();
    }, []);

    useEffect(() => {
        if (id === 2) {
            navigation.navigate("Home");
        }
    });

    getAkunLoggin();

    const [tanggal, setTanggal] = useState(new Date());

    // convert tanggal menjadi string
    const dateNow = tanggal.toISOString().split("T")[0];

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || tanggal;
        setDate(currentDate.toISOString().split("T")[0]);
    };

    const showDatepicker = () => {
        DateTimePickerAndroid.open({
            value: tanggal,
            onChange,
            mode: "date",
            is24Hour: true,
        });
    };

    const tambahData = async () => {
        await fetch(`http://192.168.220.220:8000/jadwal`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                date: date,
                staf: user,
                title: title,
                deskripsi: deskripsi,
            }),
        });
        alert("Jadwal berhasil ditambahkan!");
        navigation.navigate("Note");
    };

    return (
        <View style={{ marginTop: 20, paddingHorizontal: 5 }}>
            <Text style={styles.textLabel}>Tanggal</Text>
            <Button
                style={styles.buttonDate}
                aksi={showDatepicker}
                simbol={<Fontisto name="date" size={24} color="black" />}>
                {date ? date : dateNow}
            </Button>

            <Text style={styles.textLabel}>Staf</Text>
            <View
                style={{
                    borderWidth: 1,
                    marginBottom: 5,
                    borderRadius: 5,
                }}>
                {/* <Picker onValueChange={(value, index) => setStaf(value)}>
                    <Picker.Item value={"undefined"} label="Pilih Staf" />
                    <Picker.Item value={"Ferri adi"} label="Ferri adi" />
                    <Picker.Item value={"Catur"} label="Catur" />
                </Picker> */}
                <TextInput
                    style={{
                        borderWidth: 1,
                        marginBottom: 5,
                        borderRadius: 5,
                    }}
                    editable={false}
                    value={user}
                    // onChangeText={(text) => setTitle(text)}
                    keyboardType="default"
                />
            </View>

            <Text style={styles.textLabel}>Judul</Text>
            <TextInput
                style={{
                    borderWidth: 1,
                    marginBottom: 5,
                    borderRadius: 5,
                }}
                onChangeText={(text) => setTitle(text)}
                keyboardType="default"
                placeholder="Judul jadwal"
            />

            <Text style={styles.textLabel}>Deskripsi</Text>
            <TextInput
                style={styles.textArea}
                placeholder="Deskripsi meet"
                onChangeText={(text) => setDeskripsi(text)}
                multiline={true}
                numberOfLines={4}
            />

            <Button aksi={tambahData} style={styles.button}>
                Tambah
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
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
        padding: 8,
        alignItems: "center",
        borderRadius: 9,
        color: "black",
        marginTop: 10,
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
    textArea: {
        width: "100%",
        height: 100,
        borderColor: "gray",
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
    },
});

export default TambahJadwal;
