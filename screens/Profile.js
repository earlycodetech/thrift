import { AppContext } from '../utils/globals';
import { useState,useEffect,useCallback,useContext } from "react";
import { SafeArea } from "../utils/safearea";
import { View,Text,StyleSheet, Image } from "react-native";
import { Theme } from '../utils/theme';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { PassionsConflict_400Regular } from "@expo-google-fonts/passions-conflict";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'react-native-paper';

export function Profile ({navigation}) {
    const [appIsReady, setAppIsReady] = useState(false);
    const {userNames} = useContext(AppContext);

    useEffect(() => {
        async function prepare() {
            try {
                await Font.loadAsync({PassionsConflict_400Regular});
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
            <View style={styles.head}>
                <View style={styles.signature}>
                    <Text style={styles.signatureText}>{userNames.fname}</Text>
                </View>
                <View style={styles.profileImage}>
                    <Image style={styles.profileImg} source={require('../assets/profile-pix.jpg')}/>
                </View>
            </View>
            <View style={styles.body}>
                <Text style={styles.fullNames}>{userNames.fname} {userNames.lname}</Text>
                <View style={styles.verificationBox}>
                    <Text style={styles.verificationText}>Verified member</Text>
                    <FontAwesomeIcon 
                    icon={faCircleCheck}
                    color='#2192FF'
                    size={Theme.fonts.fontSizePoint.title}/>
                </View>
                <View style={styles.transactionHits}>
                    <View style={styles.hit}>
                        <Text style={styles.hitTitle}>Credits</Text>
                        <Text style={styles.hitvalue}>213</Text>
                    </View>
                    <View style={styles.hit}>
                        <Text style={styles.hitTitle}>Debits</Text>
                        <Text style={styles.hitvalue}>199</Text>
                    </View>
                    <View style={styles.hit}>
                        <Text style={styles.hitTitle}>Loans</Text>
                        <Text style={styles.hitvalue}>1</Text>
                    </View>
                </View>

                <Text style={styles.userStatement}>During summer holidays I have 
                applied what I learned in classes by working for three years in 
                an accounting firm. </Text>

                <Button
                mode='contained'
                color={Theme.colors.maroon700}
                >Update Profile</Button>
            </View>
        </SafeArea>
    )
}

const styles = StyleSheet.create({
    head:{
        flex:3,
        flexDirection:'row'
    },
    body:{
        flex:3,
        paddingTop:Theme.sizes[4]
    },
    signature:{
        flex:2,
        justifyContent:'flex-end',
    },
    signatureText:{
        fontFamily:'PassionsConflict_400Regular',
        fontSize:Theme.fonts.fontSizePoint.h3
    },
    profileImage:{
        flex:4
    },
    profileImg:{
        width:'100%',
        height:'100%',
        borderRadius:10
    },
    fullNames:{
        fontSize:Theme.fonts.fontSizePoint.h4
    },
    verificationBox:{
        flexDirection:'row',
        alignItems:'center'
    },
    verificationText:{
        color:Theme.colors.gray200,
        fontSize:Theme.fonts.fontSizePoint.title,
        fontWeight:'bold',
        marginRight:Theme.sizes[2],
    },
    transactionHits:{
        marginVertical:Theme.sizes[4],
        flexDirection:'row',
        justifyContent:'space-between'
    },
    hitTitle:{
        color:Theme.colors.gray200,
        fontSize:Theme.fonts.fontSizePoint.h5,
        marginBottom:Theme.sizes[3]
    },
    hitvalue:{
        fontSize:Theme.fonts.fontSizePoint.h5,
    },
    userStatement:{
        fontSize:Theme.fonts.fontSizePoint.body,
        marginBottom:Theme.sizes[2]
    }
})