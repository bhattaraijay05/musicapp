import colors from '@app/config/colors';
import {Container} from '@app/styles/Styles';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const TestScreen = () => {
  const progress = useSharedValue(0.5);
  const scale = useSharedValue(1);
  const rotate: any = useSharedValue('30deg');

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [
        {
          scale: scale.value,
        },
        {
          rotate: rotate.value,
        },
      ],
      borderRadius: (progress.value * 40) / 2,
    };
  }, [progress, scale]);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, {}), -1, true);
    scale.value = withRepeat(withSpring(2), -1, true);
    rotate.value = withRepeat(withSpring('90deg'), -1, true);
  }, []);

  return (
    <View style={Container.flexContainer}>
      <Animated.View style={[styles.box, reanimatedStyle]} />
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
    fontFamily: 'Oswald-Bold',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#00f',
    borderRadius: 10,
  },
});
