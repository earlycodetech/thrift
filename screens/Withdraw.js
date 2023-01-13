import { useContext,useState } from "react";
import {AppContext} from '../utils/globals';
import { View,StyleSheet,Text, Alert,ActivityIndicator } from "react-native";
import { Theme } from "../utils/theme";
import { SafeArea } from '../utils/safearea';
import { Button,TextInput } from "react-native-paper";
import { Formik } from "formik";
import * as yup from 'yup';
import { db } from "../firebase/firebase.settings";
import { addDoc,collection } from "firebase/firestore";

const formRules = yup.object({
    amount:yup.number()
    .min(1)
    .required('This is a compulsory field')
});

export function Withdraw ({navigation}) {
    const {uid} = useContext(AppContext);
    const [loading,setLoading] = useState(false); //for ActivityIndicator

    return ( 
        <SafeArea>
            <View style={styles.container}>
                <Formik
                    initialValues={{
                        amount:0,
                    }}
                    
                    onSubmit={(values,action) => {
                        setLoading(true);
                        addDoc(collection(db,'statement'),{
                            amount:values.amount,
                            by:uid,
                            timestamp:new Date().getTime()
                        })
                        .then(() => {
                            setLoading(false);
                            Alert.alert(
                                'Transaction Status',
                                `Your withdrawal of ₦${values.amount} was successful`,
                                [{text:'Okay'}]
                            );
                        })
                        .catch((err) => {
                            setLoading(false);
                            Alert.alert(
                                'Transaction Status',
                                'There was a problem completing your transaction',
                                [{text:'Try again'}]
                            );
                        })

                        action.resetForm();//clear inputs
                    }}

                    validationSchema={formRules}>
                        {({ handleChange, handleBlur, handleSubmit, values, errors,touched }) =>{
                            return (
                                <View style={styles.form}>
                                    {loading ? <ActivityIndicator size='large' color={Theme.colors.gray500}/> : null}
                                    <Text style={[styles.title,{
                                        marginTop:loading ? Theme.sizes[4] : 0
                                    }]}>Make a withdrawal</Text>

                                    <TextInput 
                                    placeholder="amount"
                                    mode="contained"
                                    style={{fontSize:24,color:'#3C4048',marginBottom:Theme.sizes[1]}}
                                    keyboardType='number-pad'
                                    onChangeText={handleChange('amount')}
                                    onBlur={handleBlur('amount')}
                                    value={values.amount}/>
                                    <Text style={{display:touched.amount && errors.amount ? 'flex' : 'none', color:'red'}}>
                                        {touched.amount && errors.amount}
                                    </Text>

                                    <View style={styles.submitBlock}>
                                        <Text style={styles.info}>Your withdrawal will decrease your credit score</Text>
                                        <Button
                                        mode="contained"
                                        color={Theme.colors.gray500}
                                        contentStyle={{paddingVertical:Theme.sizes[3]}}
                                        onPress={handleSubmit}>
                                            WITHDRAW
                                        </Button>
                                    </View>
                                </View>
                            )
                        }}
                    </Formik>
            </View>
        </SafeArea>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:Theme.sizes[3]
    },
    title:{
        fontSize:Theme.fonts.fontSizePoint.h4,
        color:Theme.colors.gray500,
        marginBottom:Theme.sizes[4],
    },
    submitBlock:{
        marginTop:Theme.sizes[4]
    },
    info:{
        fontSize:Theme.fonts.fontSizePoint.body,
        color:Theme.colors.gray200,
        marginBottom:Theme.sizes[1]
    },
    
})