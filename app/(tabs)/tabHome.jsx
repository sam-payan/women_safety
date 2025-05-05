import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";

const CommunityScreen = () => {
  const [search, setSearch] = useState("");

  const featuredItems = [
    {
      title: "Women in Leadership",
      info: "🎙️ Webinar | 2nd Nov",
      image: "https://cdn-icons-png.flaticon.com/512/2015/2015710.png"
    },
    {
      title: "Support Girls' Education",
      info: "🎯 Goal: ₹1,00,000",
      image: "https://cdn-icons-png.flaticon.com/512/3063/3063366.png"
    },
    {
      title: "Health Camp Initiative",
      info: "🏥 Free Checkups",
      image: "https://cdn-icons-png.flaticon.com/512/3063/3063366.png"
    }
  ];

  const renderItem = ({ item }) => (
    <View style={styles.gridItem}>
      <Image source={{ uri: item.image }} style={styles.gridImage} />
      <Text style={styles.gridTitle}>{item.title}</Text>
      <Text style={styles.gridInfo}>{item.info}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.profileName}>Hello, Advocate!</Text>
          <Text style={styles.profileStatus}>Active Contributor</Text>
        </View>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search community..."
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.sectionTitle}>Featured Initiatives</Text>
      <FlatList
        data={featuredItems}
        renderItem={renderItem}
        keyExtractor={(_, i) => i.toString()}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  profileBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f5e1e6",
    padding: 15,
    borderRadius: 15,
  },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  profileName: { fontSize: 18, fontWeight: "bold" },
  profileStatus: { fontSize: 14, color: "#666" },
  searchInput: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  gridContainer: { gap: 10 },
  gridItem: {
    backgroundColor: "#fefefe",
    borderRadius: 12,
    flex: 1,
    margin: 5,
    padding: 10,
    alignItems: "center",
    elevation: 2,
  },
  gridImage: { width: 60, height: 60, marginBottom: 10 },
  gridTitle: { fontSize: 16, fontWeight: "600", textAlign: "center" },
  gridInfo: { fontSize: 14, color: "#666", marginTop: 4, textAlign: "center" },
});

export default CommunityScreen;
