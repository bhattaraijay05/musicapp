import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
import Svg, {Ellipse} from 'react-native-svg';
import {Container} from '@app/styles/Styles';

const LGTest = () => {
  return (
    <View style={Container.flexContainer}>
      <Icon name="chevron-left" style={styles.icon}></Icon>

      <LinearGradient
        colors={['#f0f0aa', '#ffaaf0', '#ff0f0f']}
        style={styles.linearGradient}>
        <Text>Vertical Gradient</Text>
      </LinearGradient>

      <View style={styles.shadowBox}></View>

      <Svg viewBox="0 0 196.82 195.32" style={styles.ellipse}>
        <Ellipse
          stroke="#f00f"
          strokeWidth={0}
          fill="#00f"
          cx={98}
          cy={98}
          rx={98}
          ry={98}></Ellipse>
      </Svg>
    </View>
  );
};

export default LGTest;

const styles = StyleSheet.create({
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: 200,
    width: 350,
  },
  icon: {
    color: 'rgba(128,128,128,1)',
    fontSize: 40,
  },
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    height: 100,
    width: 100,
    marginTop: 100,
  },
  ellipse: {
    width: 197,
    height: 195,
  },
});
