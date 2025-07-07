import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import Button from "@/app/Components/Moleculs/Button";
import _ from "lodash";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Fontisto from "@expo/vector-icons/Fontisto";

interface props {
    navigation: NavigationProp<any, any>;
}

const Home: React.FC<props> = ({ navigation }) => {
    const [data, setData] = useState<
        {
            id: number;
            hotel: string;
            RNO: number;
            ARR: number;
            RNA: number;
            RR: number;
            OCC: number;
            createdAt: string;
        }[]
    >([]);

    const [head, setHead] = useState([
        "Hotel",
        "RNO",
        "ARR",
        "RNA",
        "RR",
        "OCC%",
    ]);

    const [date, setDate] = useState(new Date());

    // Get data lewat api
    const fetchData = async () => {
        const response = await fetch("http://192.168.106.220:8000/data");
        const data = await response.json();
        setData(data);
    };

    const dateNow = date.toISOString().split("T")[0];

    // komponen did amount
    useEffect(() => {
        fetchData();
    }, []);

    // merubah data tanggal menjadi format tahun-bulan-tanggal
    const dataAsli = data.map((item) => {
        const tanggalBaru = item.createdAt.split("T")[0];
        return { ...item, createdAt: tanggalBaru };
    });

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    // grouping data berdasarkan tanggal data dibuat
    const groupData = _.groupBy(dataAsli, "createdAt");
    console.log(groupData);

    const showDatepicker = () => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: "date",
            is24Hour: true,
        });
    };

    // Mengembalikan menjadi view / tampilan
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#3bb9f7" barStyle="light-content" />
            <View style={styles.navbar}>
                <FontAwesome
                    name="user"
                    size={50}
                    color="black"
                    style={{ textAlign: "center", paddingTop: 8 }}
                />
                <View>
                    <Text style={styles.textNav}>Hello</Text>
                    <Text style={styles.textUser}>Ferri adi FO</Text>
                </View>
            </View>

            <View style={styles.topBar}>
                <Button
                    styleTitle={{ color: "white", fontWeight: 800 }}
                    simbol={<Entypo name="home" size={24} color="black" />}
                    aksi={() => navigation.navigate("Home")}
                    style={styles.button}>
                    HOME
                </Button>

                <Button
                    styleTitle={{ color: "white", fontWeight: 800 }}
                    simbol={<Entypo name="pencil" size={24} color="black" />}
                    aksi={() => navigation.navigate("Input")}
                    style={styles.button}>
                    INPUT
                </Button>
                <Button
                    styleTitle={{ color: "white", fontWeight: 800 }}
                    simbol={
                        <FontAwesome5 name="book" size={24} color="black" />
                    }
                    aksi={() => navigation.navigate("Rank")}
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
                    aksi={() => navigation.navigate("Rank")}
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
                    aksi={() => navigation.navigate("Rank")}
                    style={styles.button}>
                    Set Akun
                </Button>
            </View>

            <View style={styles.headInfo}>
                <Text style={{ fontSize: 26, fontWeight: "700" }}>
                    Halaman Home
                </Text>
                <Text
                    style={{
                        borderBottomWidth: 2,
                        height: 0,
                        width: "70%",
                    }}></Text>
                <Text>Filter data Berdasarkan tanggal</Text>
            </View>

            <Button
                style={styles.buttonDate}
                aksi={showDatepicker}
                simbol={<Fontisto name="date" size={24} color="black" />}>
                {dateNow}
            </Button>

            <View>
                <TouchableOpacity>
                    <Text>Cetak</Text>
                </TouchableOpacity>
            </View>
            {/* Table content */}

            {Object.keys(groupData).map((key, index) => (
                <View key={index} style={styles.contentCon}>
                    <Text key={index}>{key}</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 3,
                            borderBottomWidth: 2,
                            backgroundColor: "#ede9e8",
                        }}>
                        <Text style={{ width: 60 }}>{head[0]}</Text>
                        <Text
                            style={{
                                width: 80,
                                paddingLeft: 6,
                                backgroundColor: "#ded5d3",
                            }}>
                            {head[4]}
                        </Text>
                        <Text
                            style={{
                                width: 70,
                                paddingLeft: 6,
                                backgroundColor: "#ded5d3",
                            }}>
                            {head[2]}
                        </Text>
                        <Text>{head[3]}</Text>
                        <Text>{head[1]}</Text>

                        <Text style={{ width: 80 }}>{head[5]}</Text>
                    </View>

                    {[
                        Object.values(groupData[key])
                            .sort((a, b) => b.id - a.id)
                            .map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() =>
                                        navigation.navigate("Update", {
                                            id: item.id,
                                            data: item,
                                        })
                                    }
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginBottom: 5,
                                    }}>
                                    <View style={{ width: 70 }}>
                                        <Text>{item.hotel}</Text>
                                    </View>
                                    <View style={{ width: 90, paddingLeft: 0 }}>
                                        <Text>
                                            {item.RR.toLocaleString("id-ID")}
                                        </Text>
                                    </View>
                                    <View style={{ width: 70 }}>
                                        <Text>
                                            {item.ARR.toLocaleString("id-ID")}
                                        </Text>
                                    </View>
                                    <View style={{ width: 37 }}>
                                        <Text>{item.RNA}</Text>
                                    </View>
                                    <View style={{ width: 37 }}>
                                        <Text>{item.RNO}</Text>
                                    </View>
                                    <View style={{ width: 80 }}>
                                        <Text>{item.OCC}%</Text>
                                    </View>
                                </TouchableOpacity>
                            )),
                    ]}
                </View>
            ))}
            {/* End Table Content */}
        </View>
    );
};

const styles = StyleSheet.create({
    buttonDate: {
        borderWidth: 1,
        width: 130,
        flexDirection: "row",
        gap: 5,
        marginBottom: 40,
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

export default Home;
