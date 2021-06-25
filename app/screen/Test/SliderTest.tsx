import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import Slider from '@react-native-community/slider';
import Animated from 'react-native-reanimated';
import {Container} from '@app/styles/Styles';
import {MyButton, MyText} from '@app/utils/Elements';
import {DragableView, ZoomableImage} from '@app/utils/AnimatedElements';

const SliderTest = () => {
  const [rad, setRad] = useState(0);
  return (
    <View style={Container.flexContainer}>
      <MyText color="red">Hi</MyText>
      <MyText color="red">Hi</MyText>
      <MyText color="red" title>
        Hi
      </MyText>
      <DragableView>
        <MyButton>Hi There</MyButton>
      </DragableView>
      <DragableView>
        <Svg viewBox="0 0 196.82 195.32" style={styles.svg}>
          <Circle
            cx={50 * rad}
            cy={50 * rad}
            r={50 * rad}
            strokeWidth={1}
            fill="red"
          />
        </Svg>
      </DragableView>
      <Slider
        style={{width: 200, height: 40}}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#f00"
        maximumTrackTintColor="#000000"
        onValueChange={e => setRad(e)}
      />
      <ZoomableImage
        style={{borderRadius: 5}}
        source={{
          uri: 'https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        }}
      />
    </View>
  );
};

export default SliderTest;

const styles = StyleSheet.create({
  svg: {
    width: 197,
    height: 195,
  },
});
