import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView>
        <ThemedText type="title">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, non
          enim eveniet numquam officia reprehenderit dicta molestias maxime,
          amet a, at fugit blanditiis. Dolor necessitatibus non reprehenderit
          aliquam quos enim? Harum, esse voluptatibus tempora nobis natus
          consequatur odit quidem necessitatibus. Et exercitationem mollitia eos
          non illo, nostrum quos dolores corrupti qui ullam pariatur sunt quas
          alias ut eaque dolorem ipsa! Quae dolorem consequatur non beatae, eum
          recusandae ducimus facere ex repellendus dolores tenetur neque
          voluptatem autem cupiditate minima? Nisi tenetur blanditiis ratione
          reiciendis rerum neque eaque repellat, animi dolor aut. Repudiandae
          sequi velit necessitatibus nemo soluta molestias accusamus alias quae
          architecto nobis hic excepturi perspiciatis obcaecati reprehenderit
          nam iusto exercitationem, distinctio ad, omnis reiciendis vitae
          debitis itaque? Asperiores, consequatur quasi? Omnis, ratione. Ea
          molestiae cumque dolor error voluptate aliquam explicabo rem,
          laboriosam laborum commodi maxime ut vero aliquid nostrum ducimus
          mollitia veniam reiciendis? Quod perspiciatis minima architecto ipsum.
          Doloremque, nobis. Accusamus rem dolor dolorem, illo ipsum blanditiis
          eveniet impedit fugiat saepe possimus, sapiente a delectus, corporis
          quam. Maiores aperiam iure enim deleniti facilis quaerat, quisquam
          delectus nisi suscipit magni earum. Sunt odit dicta quisquam quae aut?
          Quae ipsa labore cum nostrum cupiditate distinctio excepturi
          voluptatibus repellat quisquam! Ipsa, est quisquam laborum quasi
          excepturi officia inventore odit velit voluptates dolores a. Aliquam
          ut delectus totam repellat quisquam doloribus, asperiores cum
          recusandae reiciendis. Ullam optio earum quaerat, corporis, autem
          recusandae asperiores quas magni sequi iusto error nemo aliquid
          praesentium minus magnam natus. Vel quam vero, minus unde nesciunt
          facilis eum distinctio sed provident ipsum, temporibus quia molestias
          totam dolor! Impedit quia quasi doloremque repellat voluptatum minus
          deleniti quidem harum, quaerat cumque ipsum? Ipsam accusantium non
          ducimus porro harum! Eaque voluptatem aperiam tempora accusantium
          provident laboriosam voluptates doloremque consequatur temporibus fuga
          iste iusto voluptatibus deleniti laborum pariatur, animi possimus odio
          nemo commodi nesciunt.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
