import { useState,useEffect,useContext } from "react";
import { AppContext } from "../utils/globals";
import { View,Text,StyleSheet } from "react-native";
import { SafeArea } from '../utils/safearea';
import { Theme } from "../utils/theme";
import { db } from "../firebase/firebase.settings";
import { onSnapshot,collection,query,where,orderBy } from 'firebase/firestore';

export function History () {
    const {uid} = useContext(AppContext);
    const [history,setHistory] = useState([]);

    console.log(history);

    const queryRef = collection(db,'statement');

    useEffect(() => {
        onSnapshot(query(queryRef,where('by','==',uid),orderBy('timestamp','desc')),
        onSnapshotResponse => {
            const compiledHistory = [];

            onSnapshotResponse.forEach((document) => {
                compiledHistory.push(document.data());
                setHistory(compiledHistory);
            })
        })
    },[]);

    return (
        <SafeArea>
            <View style={styles.container}>

            </View>
        </SafeArea>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:Theme.sizes[3]
    }
})