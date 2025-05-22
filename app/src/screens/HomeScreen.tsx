import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>🌈 Welcome to Native Messages Directory 🎨</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Directories')}
        >
          <Text style={styles.buttonText}>🎭 View Directories</Text>
        </TouchableOpacity>
      </View>

      {/* Student Info Footer */}
      <View style={styles.studentInfoContainer}>
        <Text style={styles.studentInfoText}>Student ID: 1276026</Text>
        <Text style={styles.studentInfoText}>Name: Aye Kyi Kyi Cho</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6', // Light blue background
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6A0DAD', // Purple text
    marginBottom: 40,
    textAlign: 'center',
    textShadowColor: 'rgba(255, 255, 255, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  button: {
    backgroundColor: '#FF6347', // Tomato color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  studentInfoContainer: {
    backgroundColor: '#6A0DAD', // Purple background
    padding: 15,
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  studentInfoText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 2,
  },
});

export default HomeScreen;