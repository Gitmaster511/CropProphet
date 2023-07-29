import React, { useState, useRef } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import axios from 'axios';

const API_URL = 'https://api.openai.com/v1/chat/completions'; // Replace this with your OpenAI API endpoint
const apiKey = ''; // Replace this with your actual API key from OpenAI

const CropListScreen = () => {
  const [crops, setCrops] = useState([]);
  const [risks, setRisks] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const newCropInputRef = useRef(null);

  const handleAddCrop = () => {
    setCrops((prevCrops) => [...prevCrops, inputMessage]);
    setRisks((prevRisks) => [...prevRisks, '']);
    setInputMessage(''); // Clear the input field
  };

  const handleRiskChange = (index, risk) => {
    const updatedRisks = [...risks];
    updatedRisks[index] = risk;
    setRisks(updatedRisks);
  };

  const handleFetchRisks = async () => {
    try {
      const fetchedResponses = await Promise.all(
        crops.map(async (crop, index) => {
          const response = await axios.post(
            API_URL,
            {
              model: 'gpt-3.5-turbo',
              temperature: 0.5,
              messages: [

                {
                  role: 'user',
                  content: `Give me a detailed respomse on factors that can cause unexpected crop yield with the ${crop} crop: ${risks[index]}`, // Add the risk information to the message
                },
              ],
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
              },
            }
          );

          const { choices } = response.data;
          return choices[0].message.content;
        })
      );

      setRisks(fetchedResponses);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header>
        <Appbar.Content title="Potential" />
      </Appbar.Header>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Crop List */}
        <FlatList
          data={crops}
          renderItem={({ item, index }) => (
            <View style={styles.cropItem}>
              <Text>{item}</Text>
              <TextInput
                ref={index === crops.length - 1 ? newCropInputRef : null} // Ref for the newly added crop input
                style={styles.riskInput}
                value={risks[index]}
                placeholder="Enter risks here"
                onChangeText={(risk) => handleRiskChange(index, risk)}

              />
              {risks[index] !== '' && (
                <View style={styles.responseBubble}>
                  <Text style={styles.responseText}>Potential Risks: {risks[index]}</Text>
                </View>
              )}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        {/* Add Crop Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddCrop}>
          <Text style={styles.addButtonText}>Add Crop</Text>
        </TouchableOpacity>

        {/* Fetch Risks Button */}
        <TouchableOpacity style={styles.fetchButton} onPress={handleFetchRisks}>
          <Text style={styles.fetchButtonText}>Fetch Risks</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  cropItem: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  riskInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 8,
    padding: 8,
  },
  addButton: {
    backgroundColor: '#1976D2',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fetchButton: {
    backgroundColor: '#1976D2',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  fetchButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  responseBubble: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  responseText: {
    color: '#7B1FA2', // Light purple text color
    fontSize: 16,
  },
});

export default CropListScreen;
