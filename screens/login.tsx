import {
  View,
  ViewStyle,
  Text,
  TextInput,
  TextStyle,
  Image,
  ImageStyle,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Entypo, Fontisto } from "@expo/vector-icons";
import { router } from "expo-router";
import api from "@/api";
import { useLoginStore } from "@/stores/login";
import { observer } from "mobx-react-lite";

function LoginScreen() {
  const { userInfo, setUserInfo, error, setError } = useLoginStore();

  const handleSignIn = async () => {
    const res = await api.post("/auth/login", {
      email: userInfo.email,
    });
    if (res.ok) {
      router.push("/verify");
    }

  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={$ScrollViewStyle}>
        <Image
          style={$signInImage}
          source={require("@/assets/signin/signin.png")}
        />
        <Text style={$welcomeText}>Welcome Back!</Text>
        <Text style={$learningText}>Login to your of Echoistic account.</Text>
        <View style={$inputContainer}>
          <View>
            <TextInput
              style={$input}
              keyboardType="email-address"
              value={userInfo.email}
              placeholder="info@echoistic.com"
              onChangeText={(value) =>
                setUserInfo({ ...userInfo, email: value })
              }
            />
            <Fontisto
              style={{ position: "absolute", left: 26, top: 17.8 }}
              name="email"
              size={20}
              color={"#A1A1A1"}
            />

            {error && (
              <View style={$errorContainer}>
                <Entypo name="cross" size={18} color={"red"} />
                <Text style={{ color: "red", fontSize: 11, marginTop: -1 }}>
                  {error}
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={{
                padding: 16,
                borderRadius: 8,
                marginHorizontal: 16,
                backgroundColor: "#2467EC",
                marginTop: 15,
              }}
              onPress={handleSignIn}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 16,
                  fontFamily: "spaceGroteskSemiBold",
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default observer(LoginScreen);

const $ScrollViewStyle: ViewStyle = {
  flexGrow: 1,
  justifyContent: "center",
};

const $signInImage: ImageStyle = {
  width: "60%",
  height: 250,
  alignSelf: "center",
  marginBottom: 20,
};

const $welcomeText: TextStyle = {
  textAlign: "center",
  fontSize: 24,
  fontFamily: "spaceGroteskBold",
};

const $learningText: TextStyle = {
  textAlign: "center",
  color: "#575757",
  fontSize: 15,
  marginTop: 5,
};

const $inputContainer: ViewStyle = {
  marginHorizontal: 16,
  marginTop: 30,
  rowGap: 30,
};

const $input: TextStyle = {
  height: 55,
  marginHorizontal: 16,
  borderRadius: 8,
  paddingLeft: 40,
  fontSize: 16,
  backgroundColor: "white",
  color: "#A1A1A1",
};

const $visibleIcon: ViewStyle = {
  position: "absolute",
  right: 30,
  top: 15,
};

const $icon2: TextStyle = {
  position: "absolute",
  left: 23,
  top: 17.8,
  marginTop: -2,
};

const $forgotSection: TextStyle = {
  marginHorizontal: 16,
  textAlign: "right",
  fontSize: 16,
  marginTop: 10,
  fontFamily: "spaceGroteskSemiBold",
};

const $redirect: ViewStyle = {
  flexDirection: "row",
  marginHorizontal: 16,
  justifyContent: "center",
  marginBottom: 20,
  marginTop: 20,
};
const $redirectText: TextStyle = {
  fontSize: 18,
  fontFamily: "spaceGroteskSemiBold",
  color: "#2467EC",
  marginLeft: 5,
};

const $errorContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginHorizontal: 16,
  position: "absolute",
  top: 140,
};
