import React from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

const SIZE = width * 0.7;

interface PageProps {
  index: number;
  translateX: Animated.SharedValue<number>;
  item: {
    name: string;
    color: string;
    image: any;
  };
}

const IntroScreens: React.FC<PageProps> = ({index, translateX, item}) => {
  const inputRange = [(-index - 1) * width, index * width, (index + 1) * width];

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [1.5, 1, 1.5],
      Extrapolate.CLAMP,
    );

    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2.5, 0],
      Extrapolate.CLAMP,
    );

    return {
      borderRadius,
      transform: [{scale}],
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      transform: [{translateY: translateY}],
    };
  });

  return (
    <View style={[styles.container, {backgroundColor: `white`}]}>
      <Animated.View style={[styles.square, rStyle]}>
        <Animated.Image source={item.image} style={styles.image} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: height * 1.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width,
    height: SIZE,
  },
  text: {
    fontSize: 60,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  textContainer: {position: 'absolute'},
  image: {
    width: '100%',
    height: SIZE,
    resizeMode: 'contain',
  },
});

export default IntroScreens;
