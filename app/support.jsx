import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const supportOptions = [
  { id: 1, title: "FAQ", icon: "help-circle-outline", screen: "FAQ" },
  { id: 2, title: "Support Us", icon: "heart-outline", screen: "SupportUs" },
  { id: 3, title: "Live Chat", icon: "chatbubble-ellipses-outline", screen: "LiveChat" },
  { id: 4, title: "Feedback", icon: "create-outline", screen: "Feedback" },
];

const SupportScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>How can we help you?</Text>
      </View>

      <View style={styles.optionsContainer}>
        {supportOptions.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.option}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Ionicons name={item.icon} size={30} color="#AC1754" />
            <Text style={styles.optionText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  optionsContainer: {
    marginTop: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 15,
  },
});

export default SupportScreen;