import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import Main from '@app/screen/MainScreen/Main';
import SongScreen from '@app/screen/SongScreen/SongScreen';

const Stack = createSharedElementStackNavigator();

const options = {
  headerBackTitleVisible: false,
  animationEnabled: true,
  cardStyleInterpolator: ({current: {progress}}: {current: any}) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

export default function MusicNavigator() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="MainPage">
      <Stack.Screen name="MainPage" component={Main} />
      <Stack.Screen
        name="SongScreen"
        // @ts-ignore:
        component={SongScreen}
        options={() => options}
      />
    </Stack.Navigator>
  );
}
