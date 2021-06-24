import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Dimensions,
  FlatList,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import TouchableScale from 'react-native-touchable-scale';
import IntroScreens from './IntroScreens';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height, width} = Dimensions.get('window');

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

const items = [
  {
    name: 'First',
    color: 'red',
    image: require('../../images/svgs/morning.png'),
  },
  {
    name: 'Second',
    color: 'blue',
    image: require('../../images/svgs/hello.png'),
  },
  {
    name: 'Third',
    color: 'green',
    image: require('../../images/svgs/choice.png'),
  },
  {
    name: 'Fourth',
    color: 'yellow',
    image: require('../../images/svgs/confirmed.png'),
  },
];

const Dots = ({index, translateX}: any) => {
  const SIZE = 7;
  // const inputRange = [-1, 0, 1];
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0.8, 1.4, 0.8],
      Extrapolate.CLAMP,
    );
    const width = interpolate(
      translateX.value,
      inputRange,
      [7, 15, 7],
      Extrapolate.CLAMP,
    );

    const marginHorizontal = interpolate(
      translateX.value,
      inputRange,
      [7, 10, 7],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{scale}],
      width,
      marginHorizontal,
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: SIZE,
          height: SIZE,
          backgroundColor: `rgba(0, 0, 256, 0.4)`,
          marginHorizontal: 7,
          borderRadius: SIZE / 2,
        },
        rStyle,
      ]}
    />
  );
};

export default function App() {
  const ref = useRef(null);
  const translateX = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();

  const viewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: any}) => {
      setCurrentIndex(viewableItems[0].index);
    },
  ).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      translateX.value = event.contentOffset.x;
    },
  });
  const goToNext = () => {
    if (currentIndex < items.length - 1) {
      // @ts-ignore
      ref.current.scrollToIndex({
        index: currentIndex + 1,
      });
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      // @ts-ignore:
      ref.current.scrollToIndex({
        index: currentIndex - 1,
      });
    }
  };

  const _onDone = () => {
    navigation.navigate('firstpage');
    AsyncStorage.setItem('LaunchingFirstTime', 'true');
  };

  const RenderNextButton = () => {
    return (
      <View style={styles.buttonNext}>
        <TouchableScale onPress={goToNext}>
          <Text style={styles.textNext}>Next</Text>
        </TouchableScale>
      </View>
    );
  };

  const RenderLastButton = () => {
    return (
      <View style={styles.buttonNext}>
        <TouchableScale onPress={_onDone}>
          <Animated.Text style={[styles.textNext]}>Start</Animated.Text>
        </TouchableScale>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <AnimatedFlatlist
        onScroll={scrollHandler}
        pagingEnabled
        scrollEventThrottle={16}
        ref={ref}
        data={items}
        horizontal
        bounces={false}
        viewabilityConfig={viewConfig}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={viewableItemsChanged}
        renderItem={({item, index}: {item: any; index: any}) => {
          return (
            <IntroScreens
              key={index.toString()}
              item={item}
              translateX={translateX}
              index={index}
            />
          );
        }}
      />

      <View style={styles.dots}>
        {items.map((dot, index) => (
          <Dots key={index} dot={dot} translateX={translateX} index={index} />
        ))}
      </View>

      <View style={styles.buttonPrev}>
        <TouchableScale onPress={goToPrev}>
          <Text style={styles.textNext}>Prev</Text>
        </TouchableScale>
      </View>

      {currentIndex == 3 ? <RenderLastButton /> : <RenderNextButton />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonNext: {
    position: 'absolute',
    bottom: height * 0.08,
    right: width / 10,
  },
  buttonPrev: {
    position: 'absolute',
    bottom: height * 0.08,
    left: width / 10,
  },
  textNext: {
    fontSize: 30,
    color: 'rgba(0, 0, 256, 0.4)',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    bottom: height * 0.18,
    position: 'absolute',
    width,
  },
});
