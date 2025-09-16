import Layouts from "@/app/Components/Layouts/Layouts";
import Button from "@/app/Components/Moleculs/Button";
import { NavigationProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Fontisto from "@expo/vector-icons/Fontisto";

interface props {
    navigation: NavigationProp<any, any>;
}

const Ranking: React.FC<props> = ({ navigation }) => {
    const [data, setData] = useState<
        { hotel: string; RR: number; createdAt: string }[]
    >([]);

    const [date, setDate] = useState(new Date());

    // convert tanggal menjadi string
    const dateNow = date.toISOString().split("T")[0];

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    async function getData() {
        const response = await fetch("change-ip-addressWLX/data");
        const json = await response.json();

        // Mengurutkan data RR dari yang terbesar
        const sortData = json.sort((a: any, b: any) => b.RR - a.RR);
        setData(sortData);
    }

    // merubah data tanggal menjadi format tahun-bulan-tanggal
    const dataAsli = data.map((item) => {
        const tanggalBaru = item.createdAt.split("T")[0];
        return { ...item, createdAt: tanggalBaru };
    });
    const dina = new Date();
    const formatTanggal = dina.toISOString().slice(0, 10);

    // memuat getData setiap halaman di buka
    useEffect(() => {
        getData();
    }, []);

    const showDatepicker = () => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: "date",
            is24Hour: true,
        });
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
                    Halaman Ranking
                </Text>
                <Text
                    style={{
                        borderBottomWidth: 2,
                        height: 0,
                        width: "70%",
                    }}></Text>
                <Text>Menampilkan ranking hotel per hari</Text>
            </View>

            <Button
                style={styles.buttonDate}
                aksi={showDatepicker}
                simbol={<Fontisto name="date" size={24} color="black" />}>
                {dateNow}
            </Button>

            <View style={styles.containerRank}>
                <View style={styles.headRank}>
                    <Text style={styles.textHead}>Ranking Hari Ini</Text>
                    <Text style={styles.textHead}>
                        {date.toISOString().split("T")[0]}
                    </Text>
                </View>
                <View style={styles.mainRank}>
                    <Text style={styles.textRank}>No</Text>
                    <Text style={styles.textRank}>Hotel</Text>
                    <Text style={styles.textRank}>RR</Text>
                </View>
                {dataAsli.filter(
                    (item) =>
                        item.createdAt === date.toISOString().split("T")[0]
                ).length > 0 ? (
                    dataAsli
                        .filter(
                            (item) =>
                                item.createdAt ===
                                date.toISOString().split("T")[0]
                        )
                        .map((item, index) => (
                            <View key={index} style={styles.mainRank}>
                                <Text style={styles.textRank}>{index + 1}</Text>
                                <Text style={styles.textRank}>
                                    {item.hotel}
                                </Text>
                                <Text style={styles.textRank}>
                                    {item.RNO * 2}
                                </Text>
                            </View>
                        ))
                ) : (
                    <View>
                        <Text>Anda Belum Masukan Data</Text>
                    </View>
                )}
            </View>
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
        marginBottom: 40,
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
export default Ranking;
