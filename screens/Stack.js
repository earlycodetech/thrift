import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { About } from './About';
import { Withdraw } from './Withdraw';
import { Loan } from './Loan';
import { Signup } from './Signup';
import { Signin } from './Signin';
import { MyHome } from './Home';
import { Paystack } from './Paystack';

const Stack = createNativeStackNavigator();

export function StackNavigation(){
    return (
        <Stack.Navigator initialRouteName='Sign in' screenOptions={{headerShown:false}}> 
            <Stack.Screen name='About' component={About}/>
            <Stack.Screen name='Withdraw' component={Withdraw} options={{headerShown:true}}/>
            <Stack.Screen name='Loan' component={Loan}/>
            <Stack.Screen name='Sign up' component={Signup}/>
            <Stack.Screen name='Sign in' component={Signin}/>
            <Stack.Screen name='My Home' component={MyHome}/>
            <Stack.Screen name='Pay Online' component={Paystack}/>
        </Stack.Navigator>
    )
}