import { useState,useEffect,useCallback } from "react";
import { SafeArea } from "../utils/safearea";
import { View,Text,StyleSheet,ScrollView, TouchableOpacity } from "react-native";
import { Theme } from '../utils/theme';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Righteous_400Regular } from "@expo-google-fonts/righteous";
import { Button, TextInput } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

export function Signup() {
    const [appIsReady, setAppIsReady] = useState(false);

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
                <Text style={styles.intro}>Create an account to join
                Thrift cooperative society and enjoy tons of benefits</Text>

                <View style={styles.alreadyHaveAccount}>
                    <Text style={styles.infoTitle}>Already have an account?</Text>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faCircleArrowRight}
                        color={Theme.colors.purple700}
                        size={Theme.sizes[5]}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.form}>
                    <TextInput 
                    placeholder="Last name"
                    mode="outlined"
                    outlineColor={Theme.colors.purple300}
                    activeOutlineColor={Theme.colors.purple500}
                    style={{fontSize:24,color:'#3C4048',marginBottom:Theme.sizes[1]}}/>
                    
                    <TextInput 
                    placeholder="First name"
                    mode="outlined"
                    outlineColor={Theme.colors.purple300}
                    activeOutlineColor={Theme.colors.purple500}
                    style={{fontSize:24,color:'#3C4048',marginBottom:Theme.sizes[1]}}/>
                    
                    <TextInput 
                    placeholder="Phone number"
                    mode="outlined"
                    outlineColor={Theme.colors.purple300}
                    activeOutlineColor={Theme.colors.purple500}
                    style={{fontSize:24,color:'#3C4048',marginBottom:Theme.sizes[1]}}
                    keyboardType='phone-pad'/>
                    
                    <TextInput 
                    placeholder="email address"
                    mode="outlined"
                    outlineColor={Theme.colors.purple300}
                    activeOutlineColor={Theme.colors.purple500}
                    style={{fontSize:24,color:'#3C4048',marginBottom:Theme.sizes[1]}}
                    keyboardType='email-address'/>
                 
                    <TextInput 
                    placeholder="create password"
                    mode="outlined"
                    outlineColor={Theme.colors.purple300}
                    activeOutlineColor={Theme.colors.purple500}
                    style={{fontSize:24,color:'#3C4048',marginBottom:Theme.sizes[1]}}
                    secureTextEntry={true}/>

                    <TextInput 
                    placeholder="confirm password"
                    mode="outlined"
                    outlineColor={Theme.colors.purple300}
                    activeOutlineColor={Theme.colors.purple500}
                    style={{fontSize:24,color:'#3C4048',marginBottom:Theme.sizes[3]}}
                    secureTextEntry={true}/>

                    <Button
                    mode="contained"
                    color={Theme.colors.purple700}
                    contentStyle={{paddingVertical:Theme.sizes[3]}}>Create Acccount</Button>
                </View>
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
        borderColor:Theme.colors.purple300,
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