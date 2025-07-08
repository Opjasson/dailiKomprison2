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
import Fontisto from "@expo/vector-icons/Fontisto";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import Layouts from "@/app/Components/Layouts/Layouts";

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

    // convert tanggal menjadi string
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
    // console.log(groupData);

    const getDataHotel = Object.values(groupData).map((item) =>
        item.filter((a, index) => {
            return a.createdAt === dateNow;
        })
    );

    const getDoneData = getDataHotel.filter((array) => {
        return array.length > 0;
    });
      

    const generateHTML = () => {
        const rows = Object.values(getDoneData)[0]
            ?.map(
                (item, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${item.hotel}</td>
            <td>Rp ${item.RR.toLocaleString()}</td>
            <td>Rp  ${item.ARR.toLocaleString()}</td>
            <td>${item.RNA}</td>
            <td>${item.RNO}</td>
            <td>${item.OCC}%</td>
          </tr>
        `
            )
            .join("");

        return `
          <html>
            <head>
              <style>
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #000; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
              </style>
            </head>
            <body>
              <h1>Data penjualan hotel</h1>
              <p>${dateNow}</p>
              <table>
                <tr>
                  <th>No</th>
                  <th>Hotel</th>
                  <th>RR</th>
                  <th>ARR</th>
                  <th>RNA</th>
                  <th>RNO</th>
                  <th>OCCP</th>
                </tr>
                ${rows}
              </table>
            </body>
          </html>
        `;
    };
      

    const handleSavePdf = async () => {
        const htmlContent = generateHTML();
        const { uri } = await Print.printToFileAsync({
            html: htmlContent,
        });

        const customFileName = `Data_DailyComparison_${dateNow}.pdf`;
        const newUri = FileSystem.documentDirectory + customFileName;

        await FileSystem.moveAsync({
            from: uri,
            to: newUri,
        });
      
        await Sharing.shareAsync(newUri); // Menyimpan atau kirim PDF
    };

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

            <Layouts
                navigateHome={() => navigation.navigate("Home")}
                navigateInput={() => navigation.navigate("Input")}
                navigateNote={() => navigation.navigate("Note")}
                navigateRanking={() => navigation.navigate("Rank")}
                navigateSetAkun={() => navigation.navigate("SetAkun")}
            />

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

            <Button aksi={handleSavePdf} style={styles.buttonCetak}>
                Cetak
            </Button>
            {/* Table content */}

            <View style={styles.contentCon}>
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

                {Object.values(getDoneData)[0]?.map((item, index) => (
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
                        <View style={{ width: 70 }}>
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
                ))}
            </View>
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
    buttonCetak: {
        backgroundColor: "#97B067",
        width: 50,
        borderWidth: 1,
        marginLeft: 15,
        marginBottom: 15,
        padding: 3,
        borderRadius: 5,
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
