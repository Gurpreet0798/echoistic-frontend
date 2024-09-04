import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from "react-native";
import { router } from "expo-router";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function WelcomeScreen() {
  return (
    <View style={$container}>
      <View>
        <Image
          source={require("../assets/onboarding/welcome.png")}
          style={$welcomeImg}
        />
        <Image source={require("@/assets/onboarding/shape_9.png")} />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={$titleTextShape1}
          source={require("@/assets/onboarding/shape_3.png")}
        />
        <Text style={$titleText}>Welcome to</Text>
        <Image
          style={$titleTextShape2}
          source={require("@/assets/onboarding/shape_2.png")}
        />
      </View>
      <View>
        <Image
          style={$titleShape3}
          source={require("@/assets/onboarding/shape_6.png")}
        />
        <Text style={$titleText}>Echoistic!</Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <Text style={$descText}>Join Echoistic, where you can Find Your</Text>
        <Text style={$descText}>and be part of Echoes that Matter!</Text>
      </View>
      <TouchableOpacity
        style={$buttonStyle}
        onPress={() => router.push("/onboarding")}
      >
        <Text style={$buttonText}>Getting Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const $container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 50,
};

const $welcomeImg: ImageStyle = {
  width: wp("50%"),
  height: hp("20%"),
};

const $titleTextShape1: ImageStyle = {
  position: "absolute",
  left: -28,
  top: -20,
};
const $titleTextShape2: ImageStyle = {
  position: "absolute",
  right: -40,
  top: -20,
};

const $titleShape3: ImageStyle = {
  position: "absolute",
  left: 60,
};

const $titleText: TextStyle = {
  fontSize: hp("4%"),
  textAlign: "center",
  fontFamily: "spaceGroteskBold",
};

const $descText: TextStyle = {
  textAlign: "center",
  color: "#575757",
  fontSize: hp("2%"),
  fontFamily: "spaceGroteskRegular",
};

const $buttonStyle: ViewStyle = {
  backgroundColor: "#2467EC",
  width: wp("92%"),
  paddingVertical: 18,
  borderRadius: 4,
  marginTop: 40,
};

const $buttonText: TextStyle = {
  color: "white",
  textAlign: "center",
  fontFamily: "spaceGroteskBold",
};
