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

    // Get data lewat api
    const fetchData = async () => {
        const response = await fetch("http://192.168.3.220:8000/data");
        const data = await response.json();
        setData(data);
    };

    // komponen did amount
    useEffect(() => {
        fetchData();
    }, []);

    // merubah data tanggal menjadi format tahun-bulan-tanggal
    const dataAsli = data.map((item) => {
        const tanggalBaru = item.createdAt.split("T")[0];
        return { ...item, createdAt: tanggalBaru };
    });

    // grouping data berdasarkan tanggal data dibuat
    const groupData = _.groupBy(dataAsli, "createdAt");
    console.log(groupData);

    // Mengembalikan menjadi view / tampilan
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#3bb9f7" barStyle="light-content" />
            <View style={styles.navbar}>
                <Text style={styles.textNav}>Home</Text>
            </View>
            <View style={styles.topBar}>
                <Button
                    aksi={() => navigation.navigate("Home")}
                    style={styles.button}
                >HOME</Button>

                <Button
                    aksi={() => navigation.navigate("Input")}
                    style={styles.button}
                >INPUT</Button>
                <Button
                    aksi={() => navigation.navigate("Rank")}
                    style={styles.button}
                >RANKING</Button>
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
                                        <Text>{item.RR.toLocaleString("id-ID")}</Text>
                                    </View>
                                    <View style={{ width: 70}}>
                                        <Text>{item.ARR.toLocaleString("id-ID")}</Text>
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

        marginHorizontal: 5,
        borderRadius: 2,
        marginBottom: 10,
    },
});

export default Home;
