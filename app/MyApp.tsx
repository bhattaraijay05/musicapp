import React, {useEffect, useState} from 'react';
import TabNav from './navigation/TabNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeStack from './navigation/WelcomeStack';

const MyApp = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('LaunchingFirstTime').then(value => {
      if (value == null) {
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    return <WelcomeStack />;
  } else {
    return <TabNav />;
  }
};

export default MyApp;
