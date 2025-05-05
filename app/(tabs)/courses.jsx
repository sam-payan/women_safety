import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Modal } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
const screenWidth = Dimensions.get("window").width;

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const data = [
    {
      title: "Graphic Design",
      image: "https://cdn-icons-png.flaticon.com/512/3063/3063366.png",
      rating: "4.5",
      students: "8,230",
      instructor: "Sarah T.",
      duration: "8 Weeks",
      price: "₹4,500",
    },
    {
      title: "Web Dev Bootcamp",
      image: "https://cdn-icons-png.flaticon.com/512/2015/2015710.png",
      rating: "4.8",
      students: "12,500",
      instructor: "David S.",
      duration: "12 Weeks",
      price: "₹6,000",
    },
        {
          title: "Graphic Design",
          image: "https://cdn-icons-png.flaticon.com/512/3063/3063366.png",
          rating: "4.5",
          students: "8,230",
          instructor: "Sarah T.",
          duration: "8 Weeks",
          price: "₹4,500",
        },
        {
          title: "Web Dev Bootcamp",
          image: "https://cdn-icons-png.flaticon.com/512/2015/2015710.png",
          rating: "4.8",
          students: "12,500",
          instructor: "David S.",
          duration: "12 Weeks",
          price: "₹6,000",
        },
        {
          title: "Data Science Fundamentals",
          image: "https://cdn-icons-png.flaticon.com/512/2721/2721297.png",
          rating: "4.7",
          students: "9,100",
          instructor: "Meera A.",
          duration: "10 Weeks",
          price: "₹7,000",
        },
        {
          title: "Mobile App Development",
          image: "https://cdn-icons-png.flaticon.com/512/3251/3251630.png",
          rating: "4.6",
          students: "6,700",
          instructor: "Arjun R.",
          duration: "9 Weeks",
          price: "₹6,500",
        },
        {
          title: "Digital Marketing Strategy",
          image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
          rating: "4.4",
          students: "7,800",
          instructor: "Neha S.",
          duration: "6 Weeks",
          price: "₹5,000",
        },
            
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Welcome 👋</Text>
        <Text style={styles.sub}>Explore courses to upskill</Text>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#888" />
          <TextInput
            placeholder="Search courses..."
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.feed}>
        {data.map((course, index) => (
          <TouchableOpacity key={index} style={styles.post} onPress={() => setSelected(course)}>
            <Image source={{ uri: course.image }} style={styles.postImage} />
            <View style={styles.postBody}>
              <Text style={styles.title}>{course.title}</Text>
              <Text style={styles.meta}>
                ⭐ {course.rating} | 👥 {course.students}
              </Text>
              <Text style={styles.subMeta}>
                Instructor: {course.instructor}
              </Text>
              <View style={styles.tagBox}>
                <Text style={styles.tag}>{course.duration}</Text>
                <Text style={styles.tag}>{course.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={!!selected} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity onPress={() => setSelected(null)} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#444" />
            </TouchableOpacity>
            <Image source={{ uri: selected?.image }} style={styles.modalImage} />
            <Text style={styles.modalTitle}>{selected?.title}</Text>
            <Text style={styles.modalMeta}>
              Rating: {selected?.rating} | Students: {selected?.students}
            </Text>
            <Text style={styles.modalMeta}>Instructor: {selected?.instructor}</Text>
            <Text style={styles.modalMeta}>Duration: {selected?.duration}</Text>
            <Text style={styles.modalMeta}>Price: {selected?.price}</Text>
            <TouchableOpacity style={styles.enrollButton}>
              <Text style={styles.enrollText}>Enroll Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    padding: 20,
    backgroundColor: "#6200ea",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  heading: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  sub: { fontSize: 14, color: "#ddd", marginTop: 4 },
  searchBox: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 15,
  },
  searchInput: { marginLeft: 10, flex: 1 },
  feed: {
    padding: 15,
    paddingBottom: 60,
  },
  post: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    flexDirection: "row",
    marginBottom: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    elevation: 2,
  },
  postImage: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
  },
  postBody: { flex: 1, justifyContent: "center", paddingRight: 10 },
  title: { fontSize: 16, fontWeight: "600", color: "#222" },
  meta: { fontSize: 13, color: "#666", marginTop: 2 },
  subMeta: { fontSize: 12, color: "#999", marginTop: 2 },
  tagBox: { flexDirection: "row", marginTop: 8, gap: 10 },
  tag: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    color: "#444",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#0006",
    justifyContent: "flex-end",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeBtn: {
    alignSelf: "flex-end",
  },
  modalImage: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    marginVertical: 10,
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  modalMeta: { fontSize: 14, color: "#555", marginBottom: 5 },
  enrollButton: {
    backgroundColor: "#6200ea",
    paddingVertical: 12,
    marginTop: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  enrollText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

export default HomeScreen;
