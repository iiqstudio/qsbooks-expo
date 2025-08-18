import RandomQuoteComponent from "@/components/RandomQuoteComponent";
import { SafeAreaView, View } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View>
        <RandomQuoteComponent />
      </View>
    </SafeAreaView>
  );
}
