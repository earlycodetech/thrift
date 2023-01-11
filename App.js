import { NavigationContainer } from "@react-navigation/native";
import { StackNavigation } from "./screens/Stack";
import { AppProvider } from "./utils/globals";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage"])

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </AppProvider>
  );
}