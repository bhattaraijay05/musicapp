import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import Slider from '@react-native-community/slider';
import Animated from 'react-native-reanimated';
import {Container} from '@app/styles/Styles';
import {MyButton, MyText} from '@app/utils/Elements';

const SliderTest = () => {
  const [rad, setRad] = useState(0);
  return (
    <View style={Container.flexContainer}>
      <MyText color="red">Hi</MyText>
      <MyText color="red">Hi</MyText>
      <MyText color="red" title>
        Hi
      </MyText>
      <MyButton center>Hi There</MyButton>

      <Animated.View>
        <Svg viewBox="0 0 196.82 195.32" style={styles.svg}>
          <Circle
            cx={50 * rad}
            cy={50 * rad}
            r={50 * rad}
            strokeWidth={1}
            fill="red"
          />
        </Svg>
      </Animated.View>
      <View>
        <Slider
          style={{width: 200, height: 40}}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#f00"
          maximumTrackTintColor="#000000"
          onValueChange={e => setRad(e)}
        />
      </View>
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
