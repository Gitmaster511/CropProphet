import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';

const Homepage = () => {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.backgroundImage}>
        <View style={styles.logoContainer}>
          <Image source={require('./assets/logonotext.png')} style={styles.logo} />
        </View>
        <Text style={styles.blurb}>
          Welcome to Crop Prophet!
        </Text>
        <Text style={styles.subBlurb}>
          Empowering Farmers. Cultivating Success.
        </Text>
        <TouchableOpacity style={styles.getStartedButton}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#4CAF50"
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  blurb: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subBlurb: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  getStartedButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Homepage;
