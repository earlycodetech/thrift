import { SafeAreaView,StyleSheet,Platform,StatusBar } from "react-native";

export function SafeArea ({children}) {
    return (
        <SafeAreaView style={styles.areaContainer}>
            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    areaContainer:{
        flex:1,
        paddingHorizontal:8,
        marginTop:Platform.OS === 'android' ? StatusBar.currentHeight + 4 : 4,
    }
})