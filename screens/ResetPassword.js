import { useState,useEffect,useCallback } from "react";
import { SafeArea } from "../utils/safearea";
import { View,Text,StyleSheet,ScrollView, TouchableOpacity,ActivityIndicator } from "react-native";
import { Theme } from '../utils/theme';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Righteous_400Regular } from "@expo-google-fonts/righteous";
import { Button, TextInput } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Formik } from "formik";
import * as yup from 'yup';
import { authentication } from "../firebase/firebase.settings";
import { sendPasswordResetEmail } from "firebase/auth";

const formRules = yup.object({
    email:yup.string('invalid characters')
    .email('must be an email')
    .max(60,'not more than 32 characters')
    .required('This is a compulsory field')
});

export function ResetPassword({navigation}) {
    const [appIsReady, setAppIsReady] = useState(false);
    const [loading,setLoading] = useState(false); //for ActivityIndicator

    useEffect(() => {
        async function prepare() {
            try {
                await Font.loadAsync({Righteous_400Regular});
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
        await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <SafeArea>
            <ScrollView>
                <Text style={styles.brand}>Thrift</Text>
                <Text style={styles.intro}>Reset your password</Text>

                <Formik
                    initialValues={{
                        email:''
                    }}
                    
                    onSubmit={(values,action) => {
                        setLoading(true);
                        sendPasswordResetEmail(authentication,values.email)
                        .then(() => navigation.navigate('Sign in'))

                        action.resetForm();//clear inputs
                    }}

                    validationSchema={formRules}>
                        {({ handleChange, handleBlur, handleSubmit, values, errors,touched }) =>{
                            return (
                                <View style={styles.form}>
                                    {loading ? <ActivityIndicator size='large' color={Theme.colors.purple900}/> : null}

                                    <TextInput 
                                    placeholder="email address"
                                    mode="outlined"
                                    outlineColor={Theme.colors.purple300}
                                    activeOutlineColor={Theme.colors.purple500}
                                    style={{fontSize:24,color:'#3C4048',marginBottom:Theme.sizes[1]}}
                                    keyboardType='email-address'
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}/>
                                    <Text style={{display:touched.email && errors.email ? 'flex' : 'none', color:'red'}}>
                                        {touched.email && errors.email}
                                    </Text>

                                    <Button
                                    mode="contained"
                                    color={Theme.colors.blue900}
                                    contentStyle={{paddingVertical:Theme.sizes[3]}}
                                    onPress={() => {
                                        handleSubmit();
                                    }}>
                                        RESET PASSWORD
                                    </Button>
                                </View>
                            )
                        }}
                    </Formik>
            </ScrollView>
        </SafeArea>
    )
}

const styles = StyleSheet.create({
    brand:{
        fontSize:Theme.fonts.fontSizePoint.h3,
        fontFamily:'Righteous_400Regular',
        color:Theme.colors.purple700,
        marginBottom:Theme.sizes[3]
    },
    intro:{
        fontSize:Theme.fonts.fontSizePoint.title
    },
    alreadyHaveAccount:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        borderWidth:1,
        borderColor:Theme.colors.blue700,
        borderRadius:6,
        paddingVertical:Theme.sizes[2],
        marginTop:Theme.sizes[2],
        marginBottom:Theme.sizes[3]
    },
    infoTitle:{
        fontSize:Theme.fonts.fontSizePoint.h5
    },
    form:{
        marginTop:Theme.sizes[2]
    }
})