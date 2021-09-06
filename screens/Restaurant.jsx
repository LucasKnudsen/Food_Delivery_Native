import React, {useState} from 'react';
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
  const [count, setCount] = useState(1);
  const scrollX = new Animated.Value(0);
  let {item, currentLocation} = route.params;

  const renderHeader = () => (
    <View style={{flexDirection: 'row', height: 50}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          width: 50,
          paddingLeft: SIZES.padding * 2,
          justifyContent: 'center',
        }}
      >
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
        }}
      >
        <View
          style={{
            width: '70%',
            height: '100%',
            backgroundColor: COLORS.lightGray3,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: SIZES.radius,
          }}
        >
          <Text style={{...FONTS.h3}}>{item.name}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          width: 50,
          paddingRight: SIZES.padding * 2,
          justifyContent: 'center',
        }}
      >
        <Image
          source={icons.list}
          resizeMode="contain"
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
    </View>
  );

  const renderFoodInfo = () => (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      scrollEventThrottle={16}
      snapToAlignment="center"
      showsHorizontalScrollIndicator={false}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
        useNativeDriver: false,
      })}
    >
      {item?.menu.map((item, index) => (
        <View key={`menu-${index}`} style={{alignItems: 'center'}}>
          <View style={{height: SIZES.height * 0.35}}>
            {/* Image */}
            <Image
              source={item.photo}
              resizeMode="cover"
              style={{width: SIZES.width, height: '100%'}}
            />

            {/* Quantity */}
            <View
              style={{
                position: 'absolute',
                bottom: -20,
                width: SIZES.width,
                height: 50,
                justifyContent: 'center',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                onPress={() => setCount(count - 1)}
                style={{
                  width: 50,
                  backgroundColor: COLORS.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopLeftRadius: 25,
                  borderBottomLeftRadius: 25,
                }}
              >
                <Text style={{...FONTS.body1}}>-</Text>
              </TouchableOpacity>
              <View
                style={{
                  width: 50,
                  backgroundColor: COLORS.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{...FONTS.h2}}>{count}</Text>
              </View>
              <TouchableOpacity
                onPress={() => setCount(count + 1)}
                style={{
                  width: 50,
                  backgroundColor: COLORS.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopRightRadius: 25,
                  borderBottomRightRadius: 25,
                }}
              >
                <Text style={{...FONTS.body1}}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Info section */}
            <View
              style={{
                width: SIZES.width,
                alignItems: 'center',
                marginTop: 15,
                paddingHorizontal: SIZES.padding * 2,
              }}
            >
              <Text
                style={{
                  marginVertical: SIZES.padding,
                  textAlign: 'center',
                  ...FONTS.h2,
                }}
              >
                {item.name} - {item.price.toFixed(2)} THB
              </Text>
              <Text style={{...FONTS.body3}}>{item.description}</Text>

              {/* Calories */}
              <View style={{flexDirection: 'row', marginTop: SIZES.padding}}>
                <Image
                  source={icons.fire}
                  style={{height: 20, width: 20, marginRight: SIZES.padding}}
                />
                <Text style={{...FONTS.body3, color: COLORS.darkgray}}>
                  {item.calories.toFixed(2)} cal
                </Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </Animated.ScrollView>
  );

  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={{height: 30}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: SIZES.padding,
          }}
        >
          {item?.menu.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: 'clamp',
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  color: dotColor,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const renderOrder = () => {
    return <View>{renderDots()}</View>;
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderFoodInfo()}
      {renderOrder()}
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
