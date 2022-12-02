import { View,Text,StyleSheet,Image,TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSackDollar,faWallet,faUsers,faPhoneVolume } from '@fortawesome/free-solid-svg-icons';

export function Intro () {
    function Tip ({tipName,tipIcon}){
        return (
            <TouchableOpacity style={styles.tip}>
                <FontAwesomeIcon 
                icon={tipIcon} 
                size={48}
                color='#E5B8F4'/>
                <Text style={styles.tipText}>{tipName}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.brandName}>Thrift</Text>
            <Image style={styles.bannerImg} source={require('../assets/business_marketing.jpg')}/>

            <Button 
            mode='contained' 
            contentStyle={{paddingVertical:20}}
            color='#810CA8'
            icon='arrow-right'
            style={{marginBottom:10}}>GET STARTED</Button>

            <Button 
            mode='contained' 
            contentStyle={{paddingVertical:20}}
            color='#2D033B'
            icon='information'>LEARN MORE</Button>
            
            <View style={styles.tips}>
                <Tip tipName='Loans' tipIcon={faSackDollar}/>
                <Tip tipName='Wallet' tipIcon={faWallet}/>
                <Tip tipName='People' tipIcon={faUsers}/>
                <Tip tipName='Support' tipIcon={faPhoneVolume}/>
            </View>        
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:20,
        paddingHorizontal:10
    },
    brandName:{
        fontSize:42,
        fontWeight:'bold',
        textAlign:'center',
        color:'#810CA8'
    },
    bannerImg:{
        width:'100%',
        height:160,
        borderRadius:10,
        marginVertical:14
    },
    tips:{
        flexDirection:'row',
        justifyContent:'space-around',
        flexWrap:'wrap',
        borderWidth:1,
        borderColor:'#E5B8F4',
        borderRadius:10,
        padding:18,
        marginTop:14
    },
    tip:{
        width:120,
        height:120,
        borderRadius:18,
        backgroundColor:'#810CA8',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:12
    },
    tipText:{
        fontSize:24,
        color:'#E5B8F4'
    }
})