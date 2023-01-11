import { useContext } from "react";
import {AppContext} from '../utils/globals';
import { SafeArea } from '../utils/safearea';
import { Button } from "react-native-paper";
import { db } from "../firebase/firebase.settings";
import { addDoc,collection } from "firebase/firestore";

export function Deposit ({navigation}) {
    const amount = 5000;
    const desc = 'daily contribution';
    const {uid} = useContext(AppContext);
    //timestamp

    function CreateDeposit() {
        addDoc(collection(db,'statement'),{
            amount:amount,
            description:desc,
            by:uid,
            timestamp:new Date().getTime()
        })
        .then(() => {
            //remove this and use Alert in your front-end
            console.log(`You have successfuly made a deposit of ${amount}`)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return ( 
        <SafeArea>
            <Button
            mode="contained"
            onPress={CreateDeposit}>Make Deposit</Button>
        </SafeArea>
    )
}