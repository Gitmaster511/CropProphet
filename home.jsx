import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; r



const Homepage = () => {



  return (
    <View style={styles.container}>
    <View style={styles.green}>

    <View style={styles.greenCurve}>


      <View style={styles.header}>
        <TouchableOpacity style={styles.hamburgerIconContainer}>
          <FontAwesome name="bars" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileIconContainer}>
          <Image source={require('./assets/profile.jpg')} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>
      <Text style={{color: "#FFFFFF", fontSize: 35, fontWeight: 'bold', textAlign: 'center'}}>
        Welcome Back!
      </Text>
      </View>



      <Text style={{fontSize: 20, color: "#000000", fontWeight: 'bold', marginTop: 30, marginLeft: 30}}> 
      Quick Access

      </Text>


      <View style={styles.menu}>
      <View style={styles.serviceCategory}>
          <FontAwesome name="bug" size={40} color="#4CAF50" />
          <Text style={styles.serviceCategoryTitle}>Pest Control</Text>
        </View>
        <View style={styles.serviceCategory}>
          <FontAwesome name="cloud" size={40} color="#4CAF50" />
          <Text style={styles.serviceCategoryTitle}>Weather Forecast</Text>
        </View>
        <View style={styles.serviceCategory}>
          <FontAwesome name="users" size={40} color="#4CAF50" />
          <Text style={styles.serviceCategoryTitle}>Market Analysis</Text>
        </View>

      </View>


    <View style={{marginTop: 40}}> 
    <Text style={styles.title}>Crop Prophet</Text>

    <Image
        source={require('./assets/logonotext.png')}
        style={styles.image}
      />
          <View style={{marginTop: 40}}> 


      <Text style={styles.slogan}>Harvesting Insight, Cultivating Success</Text>
      </View>

      </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  image: {
    width: '50%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center', 
    marginHorizontal: 120
    
  },
  title :{
    textAlign: 'center',
    fontSize: 30

  }, 
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    paddingTop: 40,
  },
  slogan: {
    fontSize: 20,
    textAlign: 'center'
  },
  hamburgerIconContainer: {
    padding: 10,
  },
  profileIconContainer: {
    padding: 10,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greenCurve: {
    height: 200,
    backgroundColor: '#4CAF50',
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    zIndex: 1,
  },
  serviceCategory: {
    alignItems: 'center',
  },
  serviceCategoryTitle: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 5,
  },
  randomStuff: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  randomStuffText: {
    fontSize: 20,
    color: '#333',
  },
});

export default Homepage;
