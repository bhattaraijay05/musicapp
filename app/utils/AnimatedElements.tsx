import React, {useCallback, useMemo, useRef} from 'react';
import {ViewStyle, ModalStyle} from '@app/styles/Styles';
import {
  TextStyle,
  Image,
  StyleSheet,
  Dimensions,
  ImageStyle,
  View,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {BottomSheetModalRef} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModalProvider/types';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

type CustomViewProps = {
  style?: TextStyle | TextStyle[];
};

type ContextType = {
  translateX: number;
  translateY: number;
};

const DragableView: React.FC<CustomViewProps> = ({children, style}) => {
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
    onEnd: () => {
      x.value = withSpring(0);
      y.value = withSpring(0);
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
      ],
    };
  }, [x, y]);

  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View style={[ViewStyle.flexContainer, panStyle, {...style}]}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

type ZoomableImageViewProps = {
  style?: ImageStyle | ImageStyle[];
  width?: number;
  height?: number;
  source: any;
};

const AnimatedImage = Animated.createAnimatedComponent(Image);

const ZoomableImage: React.FC<ZoomableImageViewProps> = ({
  children,
  style,
  width = screenWidth,
  height = 300,
  source,
}) => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: event => {
        scale.value = event.scale;
        focalX.value = event.focalX;
        focalY.value = event.focalY;
      },
      onEnd: () => {
        scale.value = withTiming(1);
      },
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: focalX.value},
        {translateY: focalY.value},
        {translateX: -width / 2},
        {translateY: -height / 2},
        {scale: scale.value},
        {translateX: -focalX.value},
        {translateY: -focalY.value},
        {translateX: width / 2},
        {translateY: height / 2},
      ],
    };
  });

  const focalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: focalX.value}, {translateY: focalY.value}],
    };
  });

  return (
    <PinchGestureHandler onGestureEvent={pinchHandler}>
      <Animated.View style={[{width, height}]}>
        <AnimatedImage
          style={[{flex: 1}, rStyle, {...style}]}
          source={source}
        />
        <Animated.View
          style={[
            {
              ...StyleSheet.absoluteFillObject,
            },
            focalPointStyle,
          ]}
        />
      </Animated.View>
    </PinchGestureHandler>
  );
};

type BottomModalProps = {
  innerRef: BottomSheetModalRef | any;
  snap: number;
};

const BottomModal: React.FC<BottomModalProps> = ({
  children,
  innerRef,
  snap = 50,
}) => {
  const snapPoints = useMemo(() => ['25%', `${snap}%`], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View style={{...StyleSheet.absoluteFillObject}}>
      <BottomSheetModalProvider>
        <View style={ModalStyle.container}>
          <BottomSheetModal
            ref={innerRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            {children}
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </View>
  );
};

export {DragableView, ZoomableImage, BottomModal};
