import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import Main from '@app/screen/MainScreen/Main';
import SongScreen from '@app/screen/SongScreen/SongScreen';
import SheetTest from '@app/screen/Test/SheetTest';
import routes from '@app/config/routes';

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
    <Stack.Navigator headerMode="none" initialRouteName={routes.musicMainPage}>
      <Stack.Screen name={routes.musicMainPage} component={Main} />
      <Stack.Screen
        name={routes.songScreen}
        // @ts-ignore:
        component={SongScreen}
        options={() => options}
      />
    </Stack.Navigator>
  );
}
