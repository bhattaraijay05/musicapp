import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Intro from '@app/screen/IntroScreen/Intro';
import TabNav from './TabNav';
import routes from '@app/config/routes';

const Stack = createStackNavigator();
const WelcomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={routes.welcome} component={Intro} />
      <Stack.Screen name={routes.firstpage} component={TabNav} />
    </Stack.Navigator>
  );
};

export default WelcomeStack;

const styles = StyleSheet.create({});
