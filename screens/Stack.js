import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { About } from './About';
import { Deposit } from './Deposit';
import { Withdraw } from './Withdraw';
import { Profile } from './Profile';
import { Loan } from './Loan';
import { Signup } from './Signup';
import { Signin } from './Signin';

const Stack = createNativeStackNavigator();

export function StackNavigation(){
    return (
        <Stack.Navigator initialRouteName='Sign up' screenOptions={{headerShown:false}}>
            <Stack.Screen name='About' component={About}/>
            <Stack.Screen name='Deposit' component={Deposit}/>
            <Stack.Screen name='Withdraw' component={Withdraw}/>
            <Stack.Screen name='Profile' component={Profile}/>
            <Stack.Screen name='Loan' component={Loan}/>
            <Stack.Screen name='Sign up' component={Signup}/>
            <Stack.Screen name='Sign in' component={Signin} options={{headerShown:true}}/>
        </Stack.Navigator>
    )
}