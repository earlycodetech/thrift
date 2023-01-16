import { AppContext } from '../utils/globals';
import { useState, useEffect, useCallback, useContext } from "react";
import { SafeArea } from "../utils/safearea";
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, Alert } from "react-native";
import { Theme } from '../utils/theme';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { PassionsConflict_400Regular } from "@expo-google-fonts/passions-conflict";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import * as ImagePicer from "expo-image-picker";
import { Modal } from 'react-native';
import { doc, onSnapshot, runTransaction, updateDoc } from 'firebase/firestore';
import { authentication, db } from '../firebase/firebase.settings';


export function Profile({ navigation }) {
    const [appIsReady, setAppIsReady] = useState(false);
    const { userNames, uid } = useContext(AppContext);
    const [image, setImage] = useState(null);
    const [load, setLoad] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [disabled, setDisabled] = useState(false);
    const [modalVisibility, setmodalVisibility] = useState(false);

    const closeModal = () => {
        setmodalVisibility(false);
    };


    useEffect(() => {
        // How to get user details for database
        onSnapshot(doc(db, "users", uid), (doc) => {
            setUserInfo(doc.data());
        })
        async function prepare() {
            try {
                await Font.loadAsync({ PassionsConflict_400Regular });
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

    // ============================= Selecting an image ======================
    /*
        Please Study the code carefully
        Before running this app onyour device run: npm install --legacy-peer-deps to install some of the dependencies on your package.json
        Update was done on the following screens: Signup, Home and Profile
    */
    // to get file information
    const getFileInfo = async (fileURI) => {
        const fileInfo = await FileSystem.getInfoAsync(fileURI)
        return fileInfo
    }

    // Geting the file size in MB
    const isLessThanTheMB = (fileSize, smallerThanSizeMB) => {
        const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB
        return isOk
    }
    // Selecting a file from device labrary
    const pickImage = async () => {
        let result = await ImagePicer.launchImageLibraryAsync({
            mediaType: ImagePicer.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 6],
            quality: 1,
        });
        if (!result.canceled) {
            const { uri, type } = result.assets[0]
            const fileInfo = await getFileInfo(uri)
            if (!fileInfo?.size) {
                Alert.alert("File", "Can't select this file as the size is unknown.")
                return
            }
            if (type === 'image') {
                // file size less than 200kb
                const isLt200kb = isLessThanTheMB(fileInfo.size, 0.2)
                if (!isLt200kb) {
                    Alert.alert("Image size",
                        "Image size must be smaller than 200kb!",
                        [{ text: 'Try again' }]
                    )
                    setImage(null)
                    return
                }
                else {
                    setmodalVisibility(true)
                    const extension = uri.substring(uri.lastIndexOf(".") + 1)
                    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
                    setImage(`data:image/${extension};base64,${base64}`)
                }
            }
        }
    }

    //  ============== Uploading Profile picture on the database =====
    const updatePicture = async () => {
        setLoad(true)
        setDisabled(true)
        const sfDocRef = doc(db, "users", uid);
        updateDoc(sfDocRef, {
            profilePic: image
        })
            .then(() => {
                Alert.alert("Profile", "Image uploaded successfully");
                setImage(null)
                setmodalVisibility(false)
                setLoad(false)
                setDisabled(false)
                navigation.navigate("Profile")
            })
            .catch(e => console.log(e))
    }

    return (
        <SafeArea>
            <View style={styles.head}>
                <View style={styles.signature}>
                    <Text style={styles.signatureText}>{userNames.fname}</Text>
                </View>
                <View style={styles.profileImage}>
                    <Image style={styles.profileImg} source={
                        userInfo.profilePic == "" ? require('../assets/profile-pix.jpg') : { uri: userInfo.profilePic }
                    } />
                    <TouchableOpacity style={styles.Editcam}
                        onPress={pickImage}
                    >
                        <FontAwesomeIcon icon={faCamera} color="white" size={15} />
                    </TouchableOpacity>
                </View>
            </View>
            {/* Modal for displaying selected images */}
            <Modal
                style={styles.modal}
                visible={modalVisibility}
                animationType="slide"
                transparent={true}
            >
                <Pressable style={styles.modalContainer} onPress={closeModal} >
                    <View style={styles.modalBottom}>
                        <Image style={styles.profileImg2} source={{ uri: image }} />
                        <View>
                            <Button
                                mode='contained'
                                color={Theme.colors.maroon700}
                                style={{ marginTop: 20 }}
                                disabled={disabled}
                                loading={load}
                                onPress={updatePicture}
                            >Upload Image</Button>
                        </View>
                    </View>
                </Pressable>
            </Modal>

            <View style={styles.body}>
                <Text style={styles.fullNames}>{userNames.fname} {userNames.lname}</Text>
                <View style={styles.verificationBox}>
                    <Text style={styles.verificationText}>Verified member</Text>
                    <FontAwesomeIcon
                        icon={faCircleCheck}
                        color='#2192FF'
                        size={Theme.fonts.fontSizePoint.title} />
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
    head: {
        flex: 3,
        flexDirection: 'row'
    },
    body: {
        flex: 3,
        paddingTop: Theme.sizes[4]
    },
    signature: {
        flex: 2,
        justifyContent: 'flex-end',
    },
    signatureText: {
        fontFamily: 'PassionsConflict_400Regular',
        fontSize: Theme.fonts.fontSizePoint.h3
    },
    profileImage: {
        flex: 4
    },
    profileImg: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    profileImg2: {
        width: 250,
        height: '70%',
        borderRadius: 10
    },
    fullNames: {
        fontSize: Theme.fonts.fontSizePoint.h4
    },
    verificationBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    verificationText: {
        color: Theme.colors.gray200,
        fontSize: Theme.fonts.fontSizePoint.title,
        fontWeight: 'bold',
        marginRight: Theme.sizes[2],
    },
    transactionHits: {
        marginVertical: Theme.sizes[4],
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    hitTitle: {
        color: Theme.colors.gray200,
        fontSize: Theme.fonts.fontSizePoint.h5,
        marginBottom: Theme.sizes[3]
    },
    hitvalue: {
        fontSize: Theme.fonts.fontSizePoint.h5,
    },
    userStatement: {
        fontSize: Theme.fonts.fontSizePoint.body,
        marginBottom: Theme.sizes[2]
    },
    Editcam: {
        position: 'absolute',
        top: 300,
        right: 10,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 50,
        padding: 5,
        backgroundColor: 'blue'
    },

    modalContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    modalBottom: {
        backgroundColor: "#3c4048d8",
        height: 600,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 10,
        paddingTop: 30,
        alignItems: "center",
    },

})