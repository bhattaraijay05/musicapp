import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TestScreen from '@app/screen/Test/TestScreen';
import {View, Text} from 'react-native';
import PanHandle from '@app/screen/Test/PanHandle';
import Icon from 'react-native-vector-icons/Feather';

import TouchableScale from 'react-native-touchable-scale';
import DragableList from '@app/screen/Test/DragableList';
import LGTest from '@app/screen/Test/LGTest';
import SliderTest from '@app/screen/Test/SliderTest';
import MusicNavigator from './MusicNavigator';
const Tab = createBottomTabNavigator();

type MyTabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

const MyTabBar: React.FC<MyTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  let iconName: any;

  return (
    <View
      style={{
        flexDirection: 'row',
        elevation: 0,
        backgroundColor: '#fff',
        height: 50,
      }}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        switch (index) {
          case 0:
            iconName = 'home';
            break;
          case 1:
            iconName = 'user';
            break;
          case 2:
            iconName = 'home';
            break;
          case 3:
            iconName = 'home';
            break;
          default:
            break;
        }

        return (
          <TouchableScale
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            activeScale={0.9}
            tension={50}
            friction={7}
            useNativeDriver
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
            }}>
            <Icon
              name={iconName}
              size={24}
              color={isFocused ? '#00f' : '#222'}
            />
            <Text
              style={{
                color: isFocused ? '#00f' : '#222',
                fontSize: isFocused ? 11 : 0,
              }}>
              {label}
            </Text>
          </TouchableScale>
        );
      })}
    </View>
  );
};

const TabNav = () => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Linear" component={SliderTest} />
      <Tab.Screen name="Main" component={MusicNavigator} />
      <Tab.Screen name="Home" component={TestScreen} />
      <Tab.Screen name="Pan" component={PanHandle} />
    </Tab.Navigator>
  );
};

export default TabNav;