import Button from "@/app/Components/Moleculs/Button";
import { NavigationProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";

interface props {
    navigation: NavigationProp<any, any>;
}

const Ranking: React.FC<props> = ({ navigation }) => {
    const [data, setData] = useState<
        { hotel: string; RR: number; createdAt: string }[]
    >([]);
    const [tanggal, setTanggal] = useState(new Date());

    async function getData() {
        const response = await fetch("http://192.168.3.220:8000/data");
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

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#3bb9f7" barStyle="light-content" />
            <View style={styles.navbar}>
                <Text style={styles.textNav}>Ranking</Text>
            </View>
            <View style={styles.topBar}>
                <Button
                    aksi={() => navigation.navigate("Home")}
                    style={styles.button}>
                    HOME
                </Button>

                <Button
                    aksi={() => navigation.navigate("Input")}
                    style={styles.button}>
                    INPUT
                </Button>
                <Button
                    aksi={() => navigation.navigate("Rank")}
                    style={styles.button}>
                    RANKING
                </Button>
            </View>

            <View style={styles.containerRank}>
                <View style={styles.headRank}>
                    <Text style={styles.textHead}>Ranking Hari Ini</Text>
                    <Text style={styles.textHead}>{formatTanggal}</Text>
                </View>
                <View style={styles.mainRank}>
                    <Text style={styles.textRank}>No</Text>
                    <Text style={styles.textRank}>Hotel</Text>
                    <Text style={styles.textRank}>RR</Text>
                </View>
                {dataAsli.filter((item) => item.createdAt === formatTanggal)
                    .length > 0 ? (
                    dataAsli
                        .filter((item) => item.createdAt === formatTanggal)
                        .map((item, index) => (
                            <View key={index} style={styles.mainRank}>
                                <Text style={styles.textRank}>{index + 1}</Text>
                                <Text style={styles.textRank}>
                                    {item.hotel}
                                </Text>
                                <Text style={styles.textRank}>
                                    {item.RR.toLocaleString("id-ID")}
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
