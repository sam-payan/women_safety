import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // <<== Importing Icon Library
import { auth, database } from '../firebaseConfig'; 
import { ref, get } from 'firebase/database';

export default function WelcomeScreen() {
  const [userName, setUserName] = useState('');
  const [lastLogin, setLastLogin] = useState('');
  const navigation = useNavigation(); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const snapshot = await get(ref(database, `users/${user.uid}`));
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUserName(userData.email?.split('@')[0] || 'User');
            setLastLogin(userData.lastLogin || 'Unknown');
          }
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1350&q=80' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.greeting}>{getGreeting()},</Text>
        <Text style={styles.userName}>{userName}!</Text>

        <Text style={styles.welcomeMessage}>
          We're happy to see you again. Your last login was on {lastLogin}.
        </Text>

        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => navigation.navigate('login')}
        >
          <Ionicons name="home" size={40} color="#fff" />
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    borderRadius: 10,
    alignItems: 'center',
    width: '85%',
  },
  greeting: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
  },
  userName: {
    fontSize: 26,
    color: '#ffeb3b',
    marginTop: 8,
  },
  welcomeMessage: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  iconButton: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 50,
    marginTop: 30,
  },
});
