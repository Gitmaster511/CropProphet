import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { getFirestore, collection, addDoc } from "firebase/firestore";

const CreatePostScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePostSubmit = async () => {
    const db = getFirestore();
    try {
      const docRef = await addDoc(collection(db, 'forumPosts'), {
        title,
        content,
        timestamp: new Date().toISOString(),
      });
      console.log('Document written with ID: ', docRef.id);

      // Navigate back to the ForumScreen after posting
      navigation.goBack();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />
      <Text style={styles.label}>Content:</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        placeholder="Enter content"
        multiline
      />
      <TouchableOpacity style={styles.submitButton} onPress={handlePostSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 16,
  },
  label: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  submitButton: {
    backgroundColor: '#1976D2',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreatePostScreen;
