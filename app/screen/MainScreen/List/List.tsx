import colors from '@app/config/colors';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import TouchableScale from 'react-native-touchable-scale';
import {SharedElement} from 'react-navigation-shared-element';
type ListProps = {
  item: any;
  id: number;
};

const List: React.FC<ListProps> = ({item, id}) => {
  const navigation = useNavigation();
  return (
    <TouchableScale
      activeScale={0.9}
      onPress={() => navigation.navigate('SongScreen', {item: item, id: id})}>
      <View style={styles.listView}>
        <View style={styles.pictureView}>
          <SharedElement id={`item.${id}.image_url`}>
            <Image
              source={{uri: item.image}}
              resizeMode="cover"
              style={styles.image}
            />
          </SharedElement>
        </View>
        <View style={styles.titleView}>
          <SharedElement id={`item.${id}.title`}>
            <Text style={styles.musicTitle}>
              {item.title} {id}
            </Text>
          </SharedElement>

          <SharedElement id={`item.${id}.description`}>
            <Text style={styles.musicDescription}>Taylor Swift {id}</Text>
          </SharedElement>
        </View>
      </View>
    </TouchableScale>
  );
};

export default List;

const styles = StyleSheet.create({
  listView: {
    flex: 1,
    height: 90,
    flexDirection: 'row',
  },
  pictureView: {
    flex: 0.3,
    paddingVertical: 5,
    alignItems: 'center',
  },
  titleView: {
    flex: 0.7,
    justifyContent: 'center',
    marginBottom: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  musicTitle: {
    fontSize: 28,
    color: colors.primary,
    fontFamily: 'Oswald-Regular',
  },
  musicDescription: {
    fontSize: 18,
    color: colors.tertiary,
    fontFamily: 'Roboto-Bold',
  },
});
