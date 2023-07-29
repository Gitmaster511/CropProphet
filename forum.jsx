const firebaseConfig = {
    apiKey: "AIzaSyBLuanvhHr-cQv_WB6OpA-sxmufRkKssu0",
    authDomain: "cropprophet-f3963.firebaseapp.com",
    projectId: "cropprophet-f3963",
    storageBucket: "cropprophet-f3963.appspot.com",
    messagingSenderId: "739832215887",
    appId: "1:739832215887:web:9c0b066b7d7c99bbb26d3a"
  };import React, { useEffect, useState } from 'react';
  import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
  import { initializeApp } from "firebase/app";
  import { getFirestore, collection, query, onSnapshot } from "firebase/firestore";
  import { createStackNavigator } from '@react-navigation/stack';
  
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore();
  
  const Stack = createStackNavigator();
  
  const ForumScreen = ({ navigation }) => {
    const [forumPosts, setForumPosts] = useState([]);
  
    useEffect(() => {
      const unsubscribe = onSnapshot(query(collection(db, 'forumPosts')), (snapshot) => {
        const posts = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setForumPosts(posts);
      });
  
      return () => unsubscribe();
    }, []);
  
    const renderPostItem = ({ item }) => {
      return (
        <TouchableOpacity onPress={() => handlePostPress(item)}>
          <View style={styles.postItem}>
            <Text style={styles.postTitle}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      );
    };
  
    const handlePostPress = (post) => {
      // Navigate to the full post page passing the post data
      navigation.navigate('FullPostScreen', { post });
    };
  
    const handleAddPost = () => {
      // Navigate to the "Create New Post" screen
      navigation.navigate('CreatePostScreen');
    };
  
    return (
      <View style={styles.container}>
        <FlatList
          data={forumPosts}
          renderItem={renderPostItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
        {/* Upload Post Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddPost}>
          <Text style={styles.addButtonText}>Upload Post</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#4CAF50',
    },
    listContainer: {
      padding: 16,
    },
    postItem: {
      backgroundColor: '#FFF',
      borderRadius: 8,
      padding: 12,
      marginBottom: 8,
    },
    postTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    addButton: {
      position: 'absolute',
      bottom: 16,
      right: 16,
      backgroundColor: '#1976D2',
      borderRadius: 8,
      padding: 12,
      alignItems: 'center',
    },
    addButtonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
  export default ForumScreen;
  