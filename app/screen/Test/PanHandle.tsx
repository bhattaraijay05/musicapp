import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {Container} from '@app/styles/Styles';

const SIZE = 120.0;
type ContextType = {
  translateX: number;
  translateY: number;
};

const PanHandle = () => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const scalex = useSharedValue(1);
  const scaley = useSharedValue(1);

  const scale = useSharedValue(1);
  const rotate: any = useSharedValue('30deg');

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateX = x.value;
      context.translateY = y.value;
    },
    onActive: (event, context) => {
      x.value = event.translationX + context.translateX;
      y.value = event.translationY + context.translateY;
    },
    onEnd: (event, context) => {
      x.value = withSpring(0);
      y.value = withSpring(0);
    },
  });

  const pinchGestureEvent = useAnimatedGestureHandler<
    PinchGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateX = scalex.value;
      context.translateY = scaley.value;
    },
    onActive: (event, context) => {
      scalex.value = event.scale + context.translateX;
      scaley.value = event.scale + context.translateY;
    },
    onEnd: (event, context) => {
      scalex.value = withSpring(1);
      scaley.value = withSpring(1);
    },
  });

  const panStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value,
        },
        {
          translateY: y.value,
        },
        {
          scale: scale.value,
        },
        {
          rotate: rotate.value,
        },
      ],
    };
  }, [x, y]);

  const pinchStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scaleX: scalex.value,
        },
        {
          scaleY: scaley.value,
        },
      ],
    };
  });

  useEffect(() => {
    scale.value = withSpring(0.8);
    rotate.value = withSpring('90deg');
  }, []);

  return (
    <View style={Container.flexContainer}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[styles.box, panStyle]} />
      </PanGestureHandler>
      <PinchGestureHandler onGestureEvent={pinchGestureEvent}>
        <Animated.View style={[styles.box, pinchStyle]} />
      </PinchGestureHandler>
    </View>
  );
};

export default PanHandle;

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
    fontFamily: 'Oswald-Bold',
  },
  box: {
    width: SIZE,
    height: SIZE,
    backgroundColor: '#00f',
    borderRadius: 20,
  },
});
