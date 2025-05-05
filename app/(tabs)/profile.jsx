import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://source.unsplash.com/200x200/?woman,portrait" }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Jane Doe</Text>
        <Text style={styles.email}>janedoe@example.com</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Personal Information</Text>
        <Text style={styles.infoText}>📞 +123 456 7890</Text>
        <Text style={styles.infoText}>📍 New York, USA</Text>
        <Text style={styles.infoText}>🎂 15th March 1995</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Account Details</Text>
        <Text style={styles.infoText}>🔑 Username: janedoe95</Text>
        <Text style={styles.infoText}>📅 Joined: January 2022</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 20,
  },

  // Header Section
  header: {
    alignItems: "center",
    marginBottom: 30,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#d45b7a",
    shadowColor: "#d45b7a",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#777",
  },

  // Info Cards
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d45b7a",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 6,
  },

  // Buttons
  button: {
    backgroundColor: "#d45b7a",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#d45b7a",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Logout Button
  logoutButton: {
    backgroundColor: "#ff4d4d",
  },
});

export default ProfileScreen;
