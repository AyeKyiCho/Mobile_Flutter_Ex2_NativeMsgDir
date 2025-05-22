import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MessagesScreen = ({ route }) => {
  const { chat } = route.params || {};

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [sender, setSender] = useState('You');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (chat?.title) {
      loadMessages();
    } else {
      setLoading(false);
    }
  }, []);

  const loadMessages = async () => {
    try {
      const stored = await AsyncStorage.getItem(`messages_${chat.title}`);
      if (stored) {
        setMessages(JSON.parse(stored));
      } else {
        // Default messages per category
        const defaultMessagesMap = {
          Books: [
            {
              id: '1',
              sender: 'Support',
              text: 'Explore our best-selling books and recommendations!',
            },
          ],
          Electronics: [
            {
              id: '1',
              sender: 'Support',
              text: 'Check out the latest gadgets and tech deals here!',
            },
          ],
          Groceries: [
            {
              id: '1',
              sender: 'Support',
              text: 'Get fresh groceries delivered to your door!',
            },
          ],
          Clothing: [
            {
              id: '1',
              sender: 'Support',
              text: 'Find your style with our trending clothing collections.',
            },
          ],
          'Discount offers': [
            {
              id: '1',
              sender: 'Support',
              text: 'Hot deals and discounts just for you!',
            },
          ],
        };

        const initialMessages = chat.messages?.length
          ? chat.messages
          : defaultMessagesMap[chat.title] || [
              {
                id: '1',
                sender: 'Support',
                text: 'Welcome to our shop!',
              },
            ];

        setMessages(initialMessages);
        await AsyncStorage.setItem(`messages_${chat.title}`, JSON.stringify(initialMessages));
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveMessages = async (newMessages) => {
    try {
      await AsyncStorage.setItem(`messages_${chat.title}`, JSON.stringify(newMessages));
      setMessages(newMessages);
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  };

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const newMessages = editingId
      ? messages.map((msg) =>
          msg.id === editingId ? { ...msg, text: trimmed } : msg
        )
      : [...messages, { id: Date.now().toString(), sender, text: trimmed }];

    saveMessages(newMessages);
    setInputText('');
    setEditingId(null);
  };

  const handleEdit = (msg) => {
    setInputText(msg.text);
    setEditingId(msg.id);
  };

  const handleDelete = (id) => {
    Alert.alert('Delete Message', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => saveMessages(messages.filter((m) => m.id !== id)),
      },
    ]);
  };

  const handleLongPress = (msg) => {
    Alert.alert('Message Options', 'Choose an action:', [
      { text: 'Edit', onPress: () => handleEdit(msg) },
      { text: 'Delete', onPress: () => handleDelete(msg.id), style: 'destructive' },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  if (!chat?.title) {
    return <Text style={styles.errorText}>Error: No directory selected!</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>{chat.title}</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#007aff" />
        ) : (
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onLongPress={() => handleLongPress(item)}
                style={[
                  styles.messageBubble,
                  item.sender === 'You' ? styles.fromYou : styles.fromFriend,
                ]}
              >
                <Text style={styles.sender}>{item.sender}:</Text>
                <Text style={styles.text}>{item.text}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.empty}>No messages yet.</Text>}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder={editingId ? 'Edit your message...' : 'Type a message'}
          value={inputText}
          onChangeText={setInputText}
        />
        <View style={styles.bottomControls}>
          <Button
            title={editingId ? 'Update Message' : 'Send Message'}
            onPress={handleSend}
            disabled={!inputText.trim()}
          />
          <TouchableOpacity
            onPress={() => setSender(sender === 'You' ? 'Support' : 'You')}
            style={styles.senderToggle}
          >
            <Text style={styles.toggleText}>Sender: {sender}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  messageBubble: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    maxWidth: '80%',
  },
  fromYou: { backgroundColor: '#e0f7fa', alignSelf: 'flex-end' },
  fromFriend: { backgroundColor: '#fce4ec', alignSelf: 'flex-start' },
  sender: { fontWeight: 'bold' },
  text: { fontSize: 16, marginTop: 4 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginTop: 10,
    borderRadius: 6,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  senderToggle: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 6,
    marginLeft: 10,
  },
  toggleText: { fontWeight: 'bold' },
  empty: {
    marginTop: 20,
    textAlign: 'center',
    color: 'gray',
    fontStyle: 'italic',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default MessagesScreen;
