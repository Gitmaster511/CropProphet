import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const API_KEY = '189f3bae8b80bd665f8becbc5c2a7578';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [botreply, setBotreply] = useState(null);


  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Location permission not granted.');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});

        const response = await axios.get(API_BASE_URL, {
          params: {
            lat: location.coords.latitude,
            lon: location.coords.longitude,
            cnt: 60,
            units: 'imperial',
            appid: API_KEY,
          },
        });

        const { list } = response.data;
        setWeatherData(list);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  useEffect(() => {
    if (weatherData.length > 0) {
      handleFetchRisks();
    }
  }, [weatherData]);
  const handleFetchRisks = async () => {
    console.log(weatherData)

    try {
          const weatherText = formatWeatherDataToText(weatherData); // Format weather data into a textual representation
          const apiKey = ''; // Replace with your actual API key
          const url = 'https://api.openai.com/v1/chat/completions';
          const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          };
          const data = {
            model: 'gpt-3.5-turbo',
            temperature: 0.5,
            messages: [
              { role: 'user', content: `Using this data predict how this weather will affect crops. Do not ask for more data work with what you are given. This should be a detailed analysis and talk about each common crop. Here is the data: ${weatherText}`},
            ],
          };
          const response = await axios.post(url, data, { headers });
          setBotreply(String(response.data.choices[0].message.content.trim()))
        } catch (error) {
          console.error('Error sending message:', error);
        }
      };
  
  // Helper function to format weather data into a textual representation
  const formatWeatherDataToText = (weatherData) => {
    // Assuming weatherData is an array of weather forecast objects
    // You can customize the formatting based on your weather data structure
    let weatherText = 'Weather Forecast:\n';
    weatherData.forEach((item) => {
      const { dt_txt, main, weather } = item;
      const { temp } = main;
      const { description } = weather[0];
      weatherText += `${dt_txt}: ${description}, ${temp}°F\n`;
    });
    return weatherText;
  };

  const renderItem = ({ item }) => {
    return (
      <SafeAreaView style={styles.forecastItem}>
        <Text style={styles.date}>{item.main.temp}°F</Text>
        <Text style={styles.temperature}>{item.weather[0].description}</Text>
        <Text style={styles.description}>{item.dt_txt}</Text>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <Text style={styles.title}> Weather Forcast</Text>
      <Text style={styles.bot}> {botreply}</Text>
      <FlatList
        data={weatherData}
        renderItem={renderItem}
        keyExtractor={(item) => item.dt.toString()}
      />
          </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  bot : {
    marginHorizontal: 10
  },
  title : {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  forecastItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  temperature: {
    fontSize: 16,
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default WeatherForecast;
