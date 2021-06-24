import colors from '@app/config/colors';
import {Container} from '@app/styles/Styles';
import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';

const DragableList = () => {
  return (
    <ScrollView style={Container.flexContainer}>
      <View>
        <Text style={styles.text}>Discover</Text>
      </View>
      {Array(15)
        .fill({
          image:
            'https://images.pexels.com/photos/7333831/pexels-photo-7333831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          title: 'Title',
          description: 'Singer',
        })
        .map((item, index) => (
          <MyList item={item} key={index} id={index} />
        ))}
    </ScrollView>
  );
};

type ListProps = {
  item: {
    image: string;
    title: string;
    description: string;
  };
  id: number;
};

const MyList: React.FC<ListProps> = ({item, id}) => {
  return (
    <View>
      <TouchableScale
        activeScale={0.9}
        tension={50}
        friction={7}
        useNativeDriver>
        <View style={styles.listView}>
          <View style={styles.pictureView}>
            <Image
              source={{uri: item.image}}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
          <View style={styles.titleView}>
            <Text style={styles.musicTitle}>
              {item.title} {id}
            </Text>
            <Text style={styles.musicDescription}>
              {item.description} {id}
            </Text>
          </View>
        </View>
      </TouchableScale>
    </View>
  );
};

export default DragableList;

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
  text: {
    fontSize: 50,
    color: colors.primary,
    fontFamily: 'Oswald-Regular',
  },
});
