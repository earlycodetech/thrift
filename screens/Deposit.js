import { View,Text } from "react-native";
import { SafeArea } from '../utils/safearea';
import { Button } from "react-native-paper";

export function Deposit ({navigation}) {
    const price = 890;

    return ( 
        <SafeArea>
            <Text>Deposit</Text>
            <Button mode="contained"
            onPress={() => navigation.navigate('Pay Online',{
                productPrice:price,
                productName:'Dell X1 Yoga Laptop',
                discount:false
            })}>Pay {price}</Button>
        </SafeArea>
    )
}