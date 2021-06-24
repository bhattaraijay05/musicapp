import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import TabNav from './app/navigation/TabNav';
import MyApp from './app/MyApp';
import PanHandle from './app/screen/Test/PanHandle';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import Intro from './app/screen/IntroScreen/Intro';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <NavigationContainer>
      <MyApp />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
