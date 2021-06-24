import {HeaderStyle} from '@app/styles/Styles';
import {MyText} from '@app/utils/Elements';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={HeaderStyle.header}>
      <TouchableScale
        onPress={goBack}
        activeScale={0.9}
        tension={50}
        friction={7}
        useNativeDriver>
        <Icon name={'keyboard-backspace'} size={32} color={'#222'} />
      </TouchableScale>
      <View>
        <MyText title fontSize={25} fontFamily="Oswald-Bold">
          Now Playing
        </MyText>
      </View>
      <TouchableScale
        activeScale={0.9}
        tension={50}
        friction={7}
        useNativeDriver>
        <Icon name={'dots-horizontal'} size={32} color={'#222'} />
      </TouchableScale>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
