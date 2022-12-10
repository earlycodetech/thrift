import { NavigationContainer } from "@react-navigation/native";
import { StackNavigation } from "./screens/Stack";

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
}