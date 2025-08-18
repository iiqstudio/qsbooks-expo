import RandomQuoteComponent from "@/components/RandomQuoteComponent";
import RateUsBlock from "@/components/RateUsBlock";
import { SafeAreaView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <RandomQuoteComponent />
        <RateUsBlock />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
