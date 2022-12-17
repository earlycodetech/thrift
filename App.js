import { NavigationContainer } from "@react-navigation/native";
import { StackNavigation } from "./screens/Stack";
import { AppProvider } from "./utils/globals";

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </AppProvider>
  );
}