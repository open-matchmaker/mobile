import React, { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Touchable, TouchableOpacity } from "react-native";
import  SelectBox  from  "react-native-multi-selectbox";
import xorBy from "lodash/xorBy";
import { User } from "../../schemas/user";
import { TextInput } from "react-native-paper";
import ReportService from "../../services/ReportService";
import { Report } from "../../schemas/report";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../@types/routes";

interface Props {
    user: User;
  }


const reportReasons = [
    {
        item: "Foto de perfil inapropriada",
        id: "fotoPerfilInapropriada",
    },
    {
        item: "Spam",
        id: "spam",
    },
    {
        item: "Abuso de linguagem, ofensa ou discriminação",
        id: "abusoDeLinguagem",
    },
    {
        item: "Uso de cheats, hacks ou bugs",
        id: "usoDeCheats",
    },
    {
        item: "Outro",
        id: "outro",
    },
];



export default function ReportForm({ user }: Props) {
    const [selectedReportReasons, setSelectedReportReasons] = useState([])
    const [reportText, setReportText] = useState("")
    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <View style={styles.formHeader}>
                    <Text style={styles.username}>{user.username}</Text>
                </View>
                <SelectBox
                    label="Motivo da denúncia"
                    options={reportReasons}
                    selectedValues={selectedReportReasons}
                    onMultiSelect={onMultiChange()}
                    onTapClose={onMultiChange()}
                    isMulti
                    arrowIconColor="#38a69d"
                    toggleIconColor= "#38a69d"
                    searchIconColor="#38a69d"
                    multiOptionContainerStyle={{
                        backgroundColor: "#38a69d",
                        color: "#fff",

                    }}
                    viewMargin={10}
                    />
                    <KeyboardAvoidingView style={styles.textInput}>
                        <TextInput
                            label="Descreva o motivo da denúncia"
                            placeholder="Digite algo..."
                            onChangeText={setReportText}
                        />
                    </KeyboardAvoidingView>
                    <TouchableOpacity style={styles.sendButton} onPress={() => sendReport()}>
                        <Text style={styles.buttonText}>Enviar Denuncia</Text>
                    </TouchableOpacity>
            </View>
        </View>
    );
    
    function onMultiChange(){
        return (item: any) => setSelectedReportReasons(xorBy(selectedReportReasons,[item],'id'))
    }

    async function sendReport(){
        let reasons = { ...selectedReportReasons };
        const report:Report = {
            description : reportText,
            reportMotive :reasons,
        }
        await ReportService.reportUser(user.id, report);
        
        alert("Usuário denunciado com sucesso!")

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#38a69d",
        flexDirection: "row",
    },
    form:{
        flex: 1,
        backgroundColor: "white",
        borderRadius: 21,
        elevation: 3,
        height: '80%',
        width: '75%',
        position: 'absolute',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 3,
        paddingRight:3,
        justifyContent: 'center',
    },
    formHeader:{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightgray",
        height: '10%',
        width: '100%',
        borderTopLeftRadius: 21,
        borderTopRightRadius: 21,
        elevation: 3,

        
    },
    username:{
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
        color: "black"
    },
    textInput:{
        
        width: '100%',
        wrap: 'wrap',
    },
    sendButton:{
        backgroundColor: "#38a69d",
        width: '80%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 285,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 10,
        
    },
    buttonText:{
        color: "#FFF",
        fontSize: 18,
    }


});

