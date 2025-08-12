import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';

// Generate at least 15 users for the list
const usersData = [
  {
    id: '1',
    name: 'Alice Johnson',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    online: true,
  },
  {
    id: '2',
    name: 'Bob Smith',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    online: false,
  },
  {
    id: '3',
    name: 'Cathy Lee',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    online: true,
  },
  {
    id: '4',
    name: 'David Kim',
    image: 'https://randomuser.me/api/portraits/men/76.jpg',
    online: false,
  },
  {
    id: '5',
    name: 'Eva Green',
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
    online: true,
  },
  {
    id: '6',
    name: 'Frank Miller',
    image: 'https://randomuser.me/api/portraits/men/15.jpg',
    online: false,
  },
  {
    id: '7',
    name: 'Grace Hopper',
    image: 'https://randomuser.me/api/portraits/women/21.jpg',
    online: true,
  },
  {
    id: '8',
    name: 'Henry Ford',
    image: 'https://randomuser.me/api/portraits/men/23.jpg',
    online: false,
  },
  {
    id: '9',
    name: 'Ivy Chen',
    image: 'https://randomuser.me/api/portraits/women/33.jpg',
    online: true,
  },
  {
    id: '10',
    name: 'Jack Black',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    online: false,
  },
  {
    id: '11',
    name: 'Karen White',
    image: 'https://randomuser.me/api/portraits/women/55.jpg',
    online: true,
  },
  {
    id: '12',
    name: 'Leo Messi',
    image: 'https://randomuser.me/api/portraits/men/10.jpg',
    online: true,
  },
  {
    id: '13',
    name: 'Mona Lisa',
    image: 'https://randomuser.me/api/portraits/women/60.jpg',
    online: false,
  },
  {
    id: '14',
    name: 'Nate Silver',
    image: 'https://randomuser.me/api/portraits/men/61.jpg',
    online: true,
  },
  {
    id: '15',
    name: 'Olivia Wilde',
    image: 'https://randomuser.me/api/portraits/women/70.jpg',
    online: false,
  },
  {
    id: '16',
    name: 'Paul Allen',
    image: 'https://randomuser.me/api/portraits/men/80.jpg',
    online: true,
  },
  {
    id: '17',
    name: 'Quinn Hughes',
    image: 'https://randomuser.me/api/portraits/men/90.jpg',
    online: false,
  },
];

const Chats = () => {
  const [search, setSearch] = useState('');

  const filteredUsers = usersData.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.userRow}>
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <Text style={styles.userName} numberOfLines={1}>
        {item.name}
      </Text>
      <View
        style={[
          styles.statusCircle,
          { backgroundColor: item.online ? '#34C759' : '#FF3B30' },
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#888"
        />
        <MagnifyingGlassIcon color="#888" size={22} style={styles.searchIcon} />
      </View>
      {/* User List */}
      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 8 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4FF',
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E1BEE7',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  searchIcon: {
    marginLeft: 8,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F3E6F9',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
  },
  userName: {
    flex: 1,
    fontSize: 17,
    color: '#36194f',
    fontWeight: '600',
  },
  statusCircle: {
    width: 15,
    height: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
    marginLeft: 12,
  },
});