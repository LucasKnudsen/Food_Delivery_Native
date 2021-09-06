import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import {icons, images, SIZES, COLORS, FONTS} from '../constants';
import {
  categoryData,
  initialCurrentLocation,
  restaurantData,
} from './data/homeData';

const Home = ({navigation}) => {
  const [categories, setCategories] = useState(categoryData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [restaurants, setRestaurants] = useState(restaurantData);
  const [currentLocation, setCurrentLocation] = useState(
    initialCurrentLocation,
  );
  // price rating
  const affordable = 1;
  const fairPrice = 2;
  const expensive = 3;

  function onSelectCategory(category) {
    //filter restaurant
    let restaurantList = restaurantData.filter(a =>
      a.categories.includes(category.id),
    );

    setRestaurants(restaurantList);

    setSelectedCategory(category);
  }

  function getCategoryNameById(id) {
    let category = categories.filter(a => a.id == id);

    if (category.length > 0) return category[0].name;

    return '';
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderMainCategories()}
      {renderRestaurantList()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});

export default Home;
