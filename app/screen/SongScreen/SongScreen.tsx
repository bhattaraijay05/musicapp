import colors from '@app/config/colors';
import {Container, Shadow, ViewStyle} from '@app/styles/Styles';
import {MyButton, MyText} from '@app/utils/Elements';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useRef} from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import Header from '../shared/Header';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomModal} from '@app/utils/AnimatedElements';

const {width, height} = Dimensions.get('window');

const SongScreen = ({route}: {route: any}) => {
  const {item, id} = route.params;
  const navigation = useNavigation();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <>
      <View style={Container.container}>
        <Header onRightButtonPress={handlePresentModalPress} />
        <View style={styles.musicView}>
          <View style={[styles.topView, Shadow.shadowBox]}>
            <View style={[ViewStyle.flexContainer]}>
              <View
                style={[
                  {
                    width: 310,
                    height: 100,
                    backgroundColor: '#EDF1F8',
                    position: 'absolute',
                    borderRadius: 50,
                  },
                ]}
              />
              <View
                style={[
                  {
                    width: 280,
                    height: 150,
                    backgroundColor: '#D9E3EF',
                    position: 'absolute',
                    borderRadius: 80,
                  },
                ]}
              />
              <SharedElement id={`item.${id}.image_url`}>
                <Image
                  source={{uri: item.image}}
                  resizeMode="cover"
                  style={[styles.image]}
                />
              </SharedElement>
            </View>

            <View style={styles.titleView}>
              <MyButton>
                <SharedElement id={`item.${id}.title`}>
                  <MyText
                    title
                    color={colors.primary}
                    center
                    fontFamily="Oswald-Bold">
                    {item.title} {id}
                  </MyText>
                </SharedElement>
              </MyButton>
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

      <BottomModal innerRef={bottomSheetModalRef} snap={70}>
        <MyText center>Hi There</MyText>
      </BottomModal>
    </>
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
    zIndex: -1,
  },
  bottomView: {
    flex: 0.05,
  },
  musicView: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 10,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    resizeMode: 'cover',
    borderWidth: 3,
    borderColor: '#fff',
  },
  titleView: {
    flex: 0.7,
    justifyContent: 'center',
    marginBottom: 10,
  },
});
