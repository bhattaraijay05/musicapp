import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type ContextType = {
  translateX: number;
  translateY: number;
};

const x = useSharedValue(0);
const y = useSharedValue(0);

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

export {panGestureEvent};
