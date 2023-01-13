import { useState,useEffect,useContext } from "react";
import { AppContext } from "../utils/globals";
import { View,Text,StyleSheet,FlatList } from "react-native";
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
        (onSnapshotResponse) => {
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
                <FlatList
                data={history}
                renderItem={({item}) => {
                    const actualDate = new Date(item.timestamp).toDateString(); 

                    return (
                        <View style={styles.transBlock}>
                            <Text style={styles.value}>₦{item.amount}</Text>
                            {
                            item.description ? 
                            <Text style={styles.desc}>{item.description}</Text> : 
                            <Text style={styles.desc}>Withdrawal by self</Text>
                            }
                            <Text style={styles.date}>{actualDate}</Text>
                        </View>
                    )
                }}
                key={({item}) => item.timestamp}/>
            </View>
        </SafeArea>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:Theme.sizes[3]
    },
    transBlock:{
        backgroundColor:Theme.colors.gray100,
        padding:Theme.sizes[2],
        marginBottom:Theme.sizes[2]
    },
    value:{
        fontSize:Theme.fonts.fontSizePoint.title,
        color:'black'
    },
    desc:{
        fontSize:Theme.fonts.fontSizePoint.body,
        color:Theme.colors.gray500
    },
    date:{
        fontSize:Theme.fonts.fontSizePoint.body,
        color:Theme.colors.gray500
    }
})