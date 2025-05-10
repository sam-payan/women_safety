import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { getDatabase, ref, push } from "firebase/database";
import { auth, database } from "../firebaseConfig"; 

const EmergencyPhoneScreen = () => {
  const navigation = useNavigation();
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contacts, setContacts] = useState([
    { id: "1", name: "Mom", phone: "+6281xxxxxxx" },
    { id: "2", name: "Brother", phone: "+6436365" },
  ]);

  const handleSaveContact = async () => {
    if (nickname && phoneNumber) {
      const contact = {
        id: Math.random().toString(),
        name: nickname,
        phone: phoneNumber,
      };
  
      try {
        const contactsRef = ref(database, "contacts");
        await push(contactsRef, contact);
        console.log("✅ Contact saved to database");
  
        setContacts([...contacts, contact]);
      } catch (err) {
        console.error("❌ Failed to save contact:", err.message);
      }
  
      setNickname("");
      setPhoneNumber("");
    } else {
      console.log("❗ Please fill all fields.");
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Emergency Contacts</Text>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Add Emergency Contact</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Nickname (e.g., Mom)"
          value={nickname}
          onChangeText={setNickname}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Phone Number (e.g., +6281xxxxxxx)"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveContact}>
          <LinearGradient
            colors={["#ff4d4d", "#ff1a1a"]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="save-outline" size={20} color="white" />
            <Text style={styles.saveButtonText}>Save Contact</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Favorite Emergency Contacts Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Favorite Emergency Contacts</Text>
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.contactCard}
              onPress={() => navigation.navigate("ContactDetails", { contact: item })}
            >
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.contactPhone}>{item.phone}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  section: {
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#444",
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
    fontSize: 16,
  },
  saveButton: {
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
  },
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  contactPhone: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});

export default EmergencyPhoneScreen;
