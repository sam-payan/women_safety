import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Avatar, Button } from 'react-native-paper';

const HelplineScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Main Helpline Card */}
      <Card style={styles.helplineCard}>
        <Card.Title
          title="Helpline"
          subtitle="Helpline number for 24/7 support"
          left={(props) => <Avatar.Icon {...props} icon="phone" />}
        />
      </Card>

      {/* Ask for Help */}
      <Card style={styles.card}>
        <Card.Title
          title="Ask for help"
          subtitle="Reach out to us for help. We are here to help you."
          left={(props) => <Avatar.Icon {...props} icon="account-question" />}
        />
      </Card>

      {/* National Helpline */}
      <Card style={styles.card}>
        <Card.Title
          title="National Helpline"
          subtitle="Common Helpline Numbers of your country are listed here."
          left={(props) => <Avatar.Icon {...props} icon="help-circle" color="red" />}
        />
      </Card>

      {/* Abhayam 181 Dial */}
      <Card style={styles.card}>
        <Card.Title
          title="Abhayam (181 Dial)"
          subtitle="An initiative taken by the Gujarat Government to stop violence against women."
          left={(props) => <Avatar.Icon {...props} icon="shield" />}
        />
      </Card>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  helplineCard: {
    backgroundColor: '#ffccd5',
    marginBottom: 10,
  },
  card: {
    marginVertical: 5,
    backgroundColor: '#fff',
  },
});

export default HelplineScreen;