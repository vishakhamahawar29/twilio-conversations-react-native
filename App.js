import React, { useEffect, useState } from 'react';
// import { StatusBar } from 'expo-status-bar';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Client } from '@twilio/conversations';

export default function App() {
  const [conversations, setConversations] = useState([]);
  const [client, setClient] = useState(null);

  useEffect(() => {
    initializeTwilioClient();
  }, []);

  const initializeTwilioClient = async () => {
    try {
      const twilioClient = new Client('<token>');
      setClient(twilioClient);

      const conversations = await twilioClient.getSubscribedConversations();

      console.log(conversations.items)
      setConversations(conversations.items);
    } catch (error) {
      console.error('Error initializing Twilio client:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Twilio Conversations</Text>
      <ScrollView style={styles.conversationsContainer}>
        {conversations.map((conversation) => (
          <View key={conversation.sid} style={styles.conversationItem}>
            <Text style={styles.conversationName}>{conversation.friendlyName}</Text>
            <Text style={styles.conversationSid}>{conversation.sid}</Text>
          </View>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  conversationsContainer: {
    flex: 1,
    width: '100%',
  },
  conversationItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  conversationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  conversationSid: {
    fontSize: 14,
    color: '#666',
  },
});