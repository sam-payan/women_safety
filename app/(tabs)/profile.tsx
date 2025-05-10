import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { getAuth } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { database } from '../../firebaseConfig';

// Define the type for user data
type UserData = {
  name: string;
  email: string;
  phone: string;
  dob: string;
  username?: string;
  joined?: string;
};

const ProfileScreen: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        try {
          // Fetch user data from Realtime Database under 'users/{uid}'
          const snapshot = await get(ref(database, 'users/' + user.uid));
          if (snapshot.exists()) {
            const data = snapshot.val();
            setUserProfile({
              name: data.name || '',
              email: data.email || '',
              phone: data.phone || '',
              dob: data.dob || '',
              username: data.username || '',
              joined: data.joined || '',
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false); // Set loading to false after data fetching is complete
        }
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://source.unsplash.com/200x200/?portrait' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{userProfile?.name || 'No Name'}</Text>
        <Text style={styles.email}>{userProfile?.email || 'No Email'}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Personal Information</Text>
        <Text style={styles.infoText}>📞 {userProfile?.phone || 'No Phone'}</Text>
        
        <Text style={styles.infoText}>🎂 {userProfile?.dob || 'No DOB'}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Account Details</Text>
        <Text style={styles.infoText}>🔑 Username: {userProfile?.username || 'No Username'}</Text>
        <Text style={styles.infoText}>📅 Joined: {userProfile?.joined || 'No Join Date'}</Text>
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
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
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
    borderColor: '#d45b7a',
    shadowColor: '#d45b7a',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#777',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d45b7a',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  button: {
    backgroundColor: '#d45b7a',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#d45b7a',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProfileScreen;
