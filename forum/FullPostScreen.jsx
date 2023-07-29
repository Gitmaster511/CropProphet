import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FullPostScreen = ({ route }) => {
  const { post } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>{post.content}</Text>
      <Text style={styles.timestamp}>Posted on: {post.timestamp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 16,
  },
  timestamp: {
    fontSize: 14,
    color: '#000000',
  },
});

export default FullPostScreen;
