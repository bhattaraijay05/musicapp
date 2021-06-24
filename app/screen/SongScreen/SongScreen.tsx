import colors from '@app/config/colors';
import {Container} from '@app/styles/Styles';
import {MyText} from '@app/utils/Elements';
import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import Header from '../shared/Header';

const SongScreen = ({route}: {route: any}) => {
  const {item, id} = route.params;
  return (
    <View style={Container.container}>
      <Header />
      <View style={styles.musicView}>
        <View style={styles.topView}>
          <SharedElement id={`item.${id}.image_url`}>
            <Image
              source={{uri: item.image}}
              resizeMode="cover"
              style={styles.image}
            />
          </SharedElement>
          <View style={styles.titleView}>
            <SharedElement id={`item.${id}.title`}>
              <MyText
                title
                color={colors.primary}
                center
                fontFamily="Oswald-Bold">
                {item.title} {id}
              </MyText>
            </SharedElement>
            <SharedElement id={`item.${id}.description`}>
              <MyText color={colors.tertiary} center bold>
                Taylor Swift {id}
              </MyText>
            </SharedElement>
          </View>
        </View>
        <View style={styles.midView}></View>
        <View style={styles.bottomView}></View>
      </View>
    </View>
  );
};

SongScreen.sharedElements = (route: any) => {
  const {id} = route.params;
  return [
    {
      id: `item.${id}.image_url`,
      animation: 'fade',
    },
    {
      id: `item.${id}.title`,
      animation: 'fade',
      resize: 'clip',
    },
    {
      id: `item.${id}.description`,
      animation: 'fade',
      resize: 'clip',
    },
  ];
};

export default SongScreen;

const styles = StyleSheet.create({
  topView: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  midView: {
    flex: 0.3,
    backgroundColor: 'blue',
  },
  bottomView: {
    flex: 0.05,
  },
  musicView: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    resizeMode: 'cover',
  },
  titleView: {
    flex: 0.7,
    justifyContent: 'center',
    marginBottom: 10,
  },
});
