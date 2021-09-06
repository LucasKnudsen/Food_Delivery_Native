import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {icons, images, COLORS, SIZES, FONTS} from '../constants';

const Restaurant = ({route, navigation}) => {
  let {item, currentLocation} = route.params;

  const renderHeader = () => (
    <View style={{flexDirection: 'row', height: 50}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          width: 50,
          paddingLeft: SIZES.padding * 2,
          justifyContent: 'center',
        }}>
        <Image
          source={icons.back}
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
          <Text style={{...FONTS.h3}}>{item.name}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          width: 50,
          paddingRight: SIZES.padding * 2,
          justifyContent: 'center',
        }}>
        <Image
          source={icons.list}
          resizeMode="contain"
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
    </View>
  );
  const renderFootInfo = () => (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      scrollEventThrottle={16}
      snapToAlignment="center"
      showsHorizontalScrollIndicator={false}>
      {item?.menu.map((item, index) => (
        <View key={`menu-${index}`} style={{alignItems: 'center'}}>
          <View style={{height: SIZES.height * 0.35}}>
            <Image
              srouce={item.photo}
              resizeMode="cover"
              style={{width: SIZES.width, height: '100%'}}
            />
          </View>
        </View>
      ))}
    </Animated.ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderFootInfo()}
    </SafeAreaView>
  );
};

export default Restaurant;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});
