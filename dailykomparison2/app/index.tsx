import {
    NavigationContainer,
    NavigationIndependentTree,
} from "@react-navigation/native";
import Route from "./Routes";

export default function Index() {
    return (
        <NavigationIndependentTree>
            <NavigationContainer>
                <Route />
            </NavigationContainer>
        </NavigationIndependentTree>
    );
}
