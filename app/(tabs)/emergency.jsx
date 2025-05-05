import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const sosIcon = require("../../assets/images/SOS.png");
const helplineIcon = require("../../assets/images/Helpline.png");
const recordIcon = require("../../assets/images/Record.png");
const trackMeIcon = require("../../assets/images/Trackme.png");
const supportIcon = require("../../assets/images/Support.png");

const EmergencyOption = ({ label, image, onPress, bgColor }) => (
  <TouchableOpacity style={[styles.optionCard, { backgroundColor: bgColor }]} onPress={onPress}>
    <Image source={image} style={styles.optionIcon} />
    <Text style={styles.optionLabel}>{label}</Text>
  </TouchableOpacity>
);

const HelpLineScreen = () => {
  const navigation = useNavigation();

  const emergencyOptions = [
    { label: "SOS", image: sosIcon, bgColor: "#ffe5e5" },
    { label: "Helpline", image: helplineIcon, bgColor: "#e0f7fa" },
    { label: "Record", image: recordIcon, bgColor: "#f3e5f5" },
    { label: "Track Me", image: trackMeIcon, bgColor: "#e8f5e9" },
    { label: "Support", image: supportIcon, bgColor: "#fff3e0" },
  ];

  const handlePress = (label) => {
    if (label === "Helpline") navigation.navigate("helpline");
    else if (label === "SOS") navigation.navigate("sos");
    else if (label === "Record") navigation.navigate("record");
    else if (label === "Track Me") navigation.navigate("track");
    else if (label === "Support") navigation.navigate("support");
  };

  return (
    <ScrollView style={styles.container}>
      {emergencyOptions.map((item, index) => (
        <EmergencyOption
          key={index}
          label={item.label}
          image={item.image}
          bgColor={item.bgColor}
          onPress={() => handlePress(item.label)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 20,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionIcon: {
    width: 50,
    height: 50,
    marginRight: 20,
    resizeMode: "contain",
  },
  optionLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});

export default HelpLineScreen;
