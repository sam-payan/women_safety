import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, FlatList, Dimensions, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const links = [
  { title: "All", icon: "list" },
  { title: "Education", icon: "school" },
  { title: "Entrepreneurship", icon: "cash" },
  { title: "Safety", icon: "shield" },
  { title: "Rehabilitation", icon: "heart" },
  { title: "Financial Assistants", icon: "wallet" },
];

const schemes = [
  {
    tag: "Entrepreneurship",
    title: "Pradhan Mantri Mudra Yojana (PMMY)",
    desc: "Provides collateral-free loans to small and micro-enterprises.",
    details: "This scheme helps small businesses get financial support from banks without the need for collateral...",
  },
  {
    tag: "Education",
    title: "Beti Bachao Beti Padhao",
    desc: "A scheme for the women in the society and provide them with the right to education",
    details: "This initiative provides scholarships and awareness programs for girl education across India...",
  },
  {
    tag: "Safety",
    title: "Mission Shakti",
    desc: "An umbrella scheme for the safety, security, and empowerment of women.",
    details: "This scheme offers self-defense training, legal aid, and financial support for women in distress...",
  },
  {
    tag: "Rehabilitation",
    title: "Working Women Hostel",
    desc: "Provides safe and conveniently located accommodation for working women.",
    details: "The government funds hostels for working women, ensuring security and comfort in major cities...",
  },
];

const Schemes = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSchemes, setFilteredSchemes] = useState(schemes);

  useEffect(() => {
    // Filter schemes based on the active category and search query
    const filtered = schemes.filter(
      (scheme) =>
        (activeCategory === "All" || scheme.tag === activeCategory) &&
        scheme.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSchemes(filtered);
  }, [activeCategory, searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER SECTION */}
      <LinearGradient style={styles.topOverlay} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={["#AC1754", "transparent"]}>
        <Image style={styles.schemeImg} source={require("../../assets/images/shemes.png")} />
        <View style={styles.top}>
          <Text style={styles.topText}>{activeTab === "list" ? "Government Schemes" : selectedScheme.title}</Text>
        </View>
      </LinearGradient>

      {/* SEARCH BAR */}
      {activeTab === "list" && (
        <TextInput
          style={styles.searchInput}
          placeholder="Search Schemes"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      )}

      {/* CATEGORY TABS (WITH ICONS) */}
      {activeTab === "list" ? (
        <>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.links}>
            {links.map((link) => (
              <TouchableOpacity
                key={link.title}
                onPress={() => setActiveCategory(link.title)}
                style={[
                  styles.linkItem,
                  activeCategory === link.title && styles.activeLink,
                  link.title === "All" && activeCategory === "All" && styles.allLink,
                ]}
              >
                <Ionicons name={link.icon} size={20} color={activeCategory === link.title ? "#fff" : "#AC1754"} />
                <Text
                  style={[styles.linkText, activeCategory === link.title && styles.activeLinkText]}
                  numberOfLines={1}
                >
                  {link.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* SCHEMES LIST */}
          <FlatList
            data={filteredSchemes}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <View style={styles.scheme}>
                <Text style={styles.schemeTag}>{item.tag}</Text>
                <Text style={styles.schemeTitle}>{item.title}</Text>
                <Text style={styles.schemeDesc}>{item.desc}</Text>
                <TouchableOpacity onPress={() => {
                  setSelectedScheme(item);
                  setActiveTab("details");
                }} style={styles.button}>
                  <Ionicons size={20} name="book-outline" color="white" />
                  <Text style={styles.buttonText}>View More</Text>
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={styles.schemes}
            ListEmptyComponent={<Text style={styles.noDataText}>No schemes found matching your criteria.</Text>}
          />
        </>
      ) : (
        // DETAILS VIEW
        <View style={styles.detailsContainer}>
          <TouchableOpacity onPress={() => setActiveTab("list")} style={styles.backButton}>
            <Ionicons size={24} name="arrow-back" color="white" />
          </TouchableOpacity>
          <Text style={styles.detailsText}>{selectedScheme.details}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  topOverlay: { position: "relative", height: 160, justifyContent: "flex-end" },
  top: { padding: 20 },
  schemeImg: {
    top: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    resizeMode: "cover",
    zIndex: -1,
  },
  topText: { color: "white", fontWeight: "bold", fontSize: 22 },
  searchInput: {
    margin: 10,
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    fontSize: 16,
  },
  links: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 60,
    alignItems: "center",
    paddingTop: 0,
    minHeight: 70,
  },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#AC1754",
    marginRight: 10,
  },
  allLink: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  activeLink: {
    backgroundColor: "#AC1754",
  },
  linkText: {
    fontWeight: "bold",
    color: "#AC1754",
    textAlign: "center",
    marginLeft: 5,
  },
  activeLinkText: {
    color: "#fff",
  },
  schemes: {
    padding: 20,
    gap: 15,
  },
  scheme: {
    width: width * 0.9,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f8f8f8",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignSelf: "center",
  },
  schemeTag: {
    color: "#777",
    fontSize: 14,
    marginBottom: 5,
  },
  schemeTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  schemeDesc: {
    fontSize: 14,
    color: "#555",
  },
  button: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
    alignSelf: "flex-start",
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginTop: 20,
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
  },
  detailsText: {
    fontSize: 16,
    color: "#333",
  },
  backButton: {
    marginBottom: 20,
    backgroundColor: "#AC1754",
    padding: 10,
    alignSelf: "flex-start",
    borderRadius: 50,
  },
});

export default Schemes;
