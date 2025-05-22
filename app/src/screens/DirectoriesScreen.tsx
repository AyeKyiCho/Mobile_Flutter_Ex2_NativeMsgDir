import React, { useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const directoryData = [
  { title: 'Books', icon: 'books', color: '#FF4500' },
  { title: 'Electronics', icon: 'electronics', color: '#d1e7dd' },
  { title: 'Clothing', icon: 'clothing', color: '#fce5cd' },
  { title: 'Groceries', icon: 'groceries', color: '#dbe5f1' },
  { title: 'Discount Offers', icon: 'discount', color: '#FFD700' },
];

const getImageSource = (iconName) => {
  const icons = {
    'books': require('../assets/icons/books.png'),
    'electronics': require('../assets/icons/electronics.png'),
    'clothing': require('../assets/icons/clothing.png'),
    'groceries': require('../assets/icons/groceries.png'),
    'discount': require('../assets/icons/discount.png'),
  };
  return icons[iconName] || require('../assets/icons/default.png');
};

const DirectoriesScreen = ({ navigation }) => {
  useEffect(() => {
    console.log('Loaded Directory Data:', directoryData.length, 'items');
  }, []);

  const handleItemPress = (directory) => {
    navigation.navigate('Messages', { chat: { title: directory.title } });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={directoryData}
        keyExtractor={(item) => item.title}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleItemPress(item)}
            style={[styles.item, { backgroundColor: item.color }]}
          >
            <Image source={getImageSource(item.icon)} style={styles.iconImage} />
            <Text style={styles.text}>{item.title}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No messages available.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, alignItems: 'center', backgroundColor: '#F5F5F5' },
  row: { justifyContent: 'space-evenly' },
  item: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    elevation: 3,
  },
  iconImage: { width: 50, height: 50, marginBottom: 10, resizeMode: 'contain' },
  text: { fontSize: 16, color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  empty: { padding: 20, textAlign: 'center', color: 'gray' },
});

export default DirectoriesScreen;