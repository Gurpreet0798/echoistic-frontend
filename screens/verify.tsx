import {
  View,
  ViewStyle,
  Text,
  TextStyle,
  Image,
  ImageStyle,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { router } from "expo-router";
import { useLoginStore } from "@/stores/login";
import api from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function VerifyScreen() {
  const { userInfo, setUserInfo } = useLoginStore();
  const [code, setCode] = useState(new Array(4).fill(""));

  const inputs = useRef<any>([...Array(4)].map(() => React.createRef()));

  const handleInput = (text: any, index: any) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1].current.focus();
    }

    if (text === "" && index > 0) {
      inputs.current[index - 1].current.focus();
    }
  };

  const handleSumbit = async () => {
    const otp = code.join("");
    const res = await api.post("/auth/verify", {
      email: userInfo.email,
      otp: otp,
    });
    if (res.ok) {
      router.push("/(tabs)/home");

      // await AsyncStorage.setItem("access_token", res.data?.accessToken);
      // await AsyncStorage.setItem("refresh_token", res.data?.refreshToken);
    }
  };

  return (
    <View style={$container}>
      <Image
        style={$verifyImage}
        source={require("@/assets/signin/verify.png")}
      />
      <Text style={$headerText}>Verification Code</Text>
      <Text style={$subText}>
        We have sent the verification code to your email address
      </Text>
      <View style={$inputContainer}>
        {code.map((_, index) => (
          <TextInput
            key={index}
            style={$inputBox}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => handleInput(text, index)}
            value={code[index]}
            ref={inputs.current[index]}
            autoFocus={index === 0}
          />
        ))}
      </View>
      <View style={{ marginTop: 10 }}>
        <TouchableOpacity style={$buttonStyle} onPress={handleSumbit}>
          <Text style={$buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <View style={$loginLink}>
        <Text style={$backText}>Back To?</Text>
        <TouchableOpacity
          onPress={() => {
            router.back();
            setUserInfo({ ...userInfo, email: "" });
          }}
        >
          <Text style={$loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const $container: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
  backgroundColor: "#fff",
};

const $verifyImage: ImageStyle = {
  width: "60%",
  height: 250,
  alignSelf: "center",
  marginBottom: 20,
};

const $headerText: TextStyle = {
  fontSize: 22,
  fontWeight: "bold",
  marginBottom: 10,
};

const $subText: TextStyle = {
  fontSize: 16,
  color: "#666",
  marginBottom: 20,
  textAlign: "center",
};

const $inputContainer: ViewStyle = {
  flexDirection: "row",
  marginBottom: 20,
};

const $inputBox: TextStyle = {
  width: 60,
  height: 60,
  borderWidth: 1,
  borderColor: "#ddd",
  textAlign: "center",
  marginRight: 10,
  borderRadius: 10,
  fontSize: 20,
};

const $loginLink: ViewStyle = {
  flexDirection: "row",
  marginTop: 30,
};

const $loginText: TextStyle = {
  color: "#3876EE",
  marginLeft: 5,
  fontSize: 16,
  fontFamily: "spaceGroteskBold",
};

const $backText: TextStyle = {
  fontSize: 16,
  fontFamily: "spaceGroteskBold",
};

const $buttonStyle: ViewStyle = {
  padding: 16,
  borderRadius: 8,
  marginHorizontal: 16,
  backgroundColor: "#2467EC",
  marginTop: 15,
  width: 200,
};

const $buttonText: TextStyle = {
  color: "white",
  textAlign: "center",
  fontSize: 16,
  fontFamily: "spaceGroteskBold",
};
