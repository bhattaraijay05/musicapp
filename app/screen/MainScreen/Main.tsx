import colors from '@app/config/colors';
import {Container} from '@app/styles/Styles';
import {MyText} from '@app/utils/Elements';
import React from 'react';
import {ScrollView, View} from 'react-native';
import List from './List/List';

const Main = () => {
  return (
    <ScrollView style={[Container.container, {backgroundColor: colors.white}]}>
      <View>
        <MyText
          color={colors.primary}
          fontSize={50}
          title
          style={{paddingLeft: 10}}>
          Discover
        </MyText>
      </View>

      {Array(5)
        .fill({
          image:
            'https://images.pexels.com/photos/7333831/pexels-photo-7333831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          title: 'Red',
          description: 'Singer',
        })
        .map((item, index) => (
          <List item={item} key={index} id={index} />
        ))}
    </ScrollView>
  );
};

export default Main;
