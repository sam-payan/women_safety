import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function WelcomeScreen() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/login');
    } catch (error: any) {
      console.log('Logout error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
        style={styles.image}
      />
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>You’ve successfully logged in.</Text>
      <Button title="Go to Dashboard" onPress={() => router.push('/dashboard')} />
      <View style={{ height: 10 }} />
      <Button title="Logout" color="red" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f8fa',
  },
  image: {
    width: 160,
    height: 160,
    marginBottom: 30,
    borderRadius: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: '#666',
    textAlign: 'center',
  },
});
