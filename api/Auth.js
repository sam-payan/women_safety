import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosInstance } from "./AxiosInstance"

export const signUp = async (data) => {
  try {
    const response = await AxiosInstance.post("/signup", data);
    console.log("Full Response:", response.data);

    if (!response.data?.token) {
      throw new Error("Token is missing in the response");
    }

    return response.data;
  } catch (error) {
    console.log("Signup Error:", error.response?.data || error.message);
    throw error;
  }
};

export const signIn = async (data) => {
  try {
    const response = await AxiosInstance.post("/login", data);

    if (response.data.token) {
      // await AsyncStorage.setItem("authToken", response.data.token);
    }

    return response.data;
  } catch (error) {
    console.log("Login Error:", error);
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem("authToken");
    console.log("User logged out successfully.");
  } catch (error) {
    console.log("Logout Error:", error);
  }
};