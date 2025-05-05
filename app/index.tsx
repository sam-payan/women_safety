import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { auth, database } from '../firebaseConfig';
import { ref, get } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const [userName, setUserName] = useState('');
  const [lastLogin, setLastLogin] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const snapshot = await get(ref(database, `users/${user.uid}`));
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUserName(userData.email?.split('@')[0] || 'User');
            setLastLogin(userData.lastLogin || 'Unknown');
          }
        } catch (error) {
          console.log('Error fetching user data:', error);
        }
      }
    });

    return () => unsubscribe();
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
          style={styles.button} 
          onPress={() => router.push('/login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.push('/signup')}
        >
          <Text style={styles.buttonText}>Signup</Text>
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
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
