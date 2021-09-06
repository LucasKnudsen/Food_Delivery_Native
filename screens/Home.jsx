import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import {COLORS, icons, SIZES, FONTS} from '../constants';
import {
  categoryData,
  initialCurrentLocation,
  restaurantData,
} from '../data/homeData';

const Home = ({navigation}) => {
  const [categories, setCategories] = useState(categoryData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [restaurants, setRestaurants] = useState(restaurantData);
  const [currentLocation, setCurrentLocation] = useState(
    initialCurrentLocation,
  );

  const handleSelectCategory = category => {
    let restaurantList = restaurantData.filter(item =>
      item.categories.includes(category.id),
    );

    setRestaurants(restaurantList);
    setSelectedCategory(category);
  };

  const getCategoryNameById = id => {
    let category = categories.filter(category => category.id === id);

    return category.length > 0 ? category[0].name : '';
  };

  const renderHeader = () => {
    return (
      <View style={{flexDirection: 'row', height: 50}}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center',
          }}>
          <Image
            source={icons.nearby}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '70%',
              height: '100%',
              backgroundColor: COLORS.lightGray3,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: SIZES.radius,
            }}>
            <Text style={{...FONTS.h3}}>{currentLocation.streetName}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: 'center',
          }}>
          <Image
            source={icons.basket}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderMainCategories = () => {
    const renderItem = ({item}) => (
      <TouchableOpacity
        onPress={() => handleSelectCategory(item)}
        style={{
          padding: SIZES.padding,
          paddingBottom: SIZES.padding * 2,
          backgroundColor:
            selectedCategory?.id === item.id ? COLORS.primary : COLORS.white,
          borderRadius: SIZES.radius,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: SIZES.padding,
          ...styles.shadow,
        }}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:
              selectedCategory?.id === item.id
                ? COLORS.white
                : COLORS.lightGray,
          }}>
          <Image
            source={item.icon}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </View>
        <Text
          style={{
            marginTop: SIZES.padding,
            color:
              selectedCategory?.id === item.id ? COLORS.white : COLORS.black,
            ...FONTS.body5,
          }}>
          {item.name}{' '}
        </Text>
      </TouchableOpacity>
    );

    return (
      <View style={{padding: SIZES.padding * 2}}>
        <Text style={{...FONTS.h1}}>Main</Text>
        <Text style={{...FONTS.h1}}>Categories</Text>

        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{paddingVertical: SIZES.padding * 2}}
        />
      </View>
    );
  };

  const renderRestaurantList = () => {
    const renderItem = ({item}) => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Restaurant', {item, currentLocation})
        }
        style={{marginBottom: SIZES.padding * 2}}>
        <View style={{marginBottom: SIZES.padding}}>
          <Image
            source={item.photo}
            resizeMode="cover"
            style={{width: '100%', height: 200, borderRadius: SIZES.radius}}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              height: 50,
              width: SIZES.width * 0.3,
              backgroundColor: COLORS.white,
              borderTopRightRadius: SIZES.radius,
              borderBottomLeftRadius: SIZES.radius,
              alignItems: 'center',
              justifyContent: 'center',
              ...styles.shadow,
            }}>
            <Text style={{...FONTS.h4}}>{item.duration}</Text>
          </View>
        </View>

        {/* Restaurant info section */}
        <Text style={{...FONTS.body2}}>{item.name}</Text>
        <View style={{marginTop: SIZES.padding, flexDirection: 'row'}}>
          <Image
            source={icons.star}
            resizeMode="contain"
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.primary,
              marginRight: 10,
            }}
          />
          <Text style={{...FONTS.body3}}>{item.rating}</Text>
          <View style={{flexDirection: 'row', marginLeft: SIZES.padding}}>
            {item.categories.map(id => (
              <View style={{flexDirection: 'row'}} key={id}>
                <Text style={{...FONTS.body3}}>{getCategoryNameById(id)}</Text>
                <Text style={{...FONTS.body3, color: COLORS.darkgray}}>
                  {' '}
                  .{' '}
                </Text>
              </View>
            ))}

            {[1, 2, 3].map(rating => (
              <Text
                key={rating}
                style={{
                  ...FONTS.body3,
                  color:
                    rating <= item.priceRating ? COLORS.black : COLORS.darkgray,
                }}>
                $
              </Text>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );

    return (
      <FlatList
        data={restaurants}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderMainCategories()}
      {renderRestaurantList()}
    </SafeAreaView>
  );
};

export default Home;

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
  },
});
