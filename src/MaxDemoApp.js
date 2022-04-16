import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/AntDesign';
import AppLovinMAX from 'react-native-applovin-max';

import AudioSetting from './utils/AudioSetting';
import Main from './screens/Main';
import Banners from './screens/Banners';
import Mrecs from './screens/Mrecs';
import Web from './screens/Web';
import Accounts from './max/Accounts';
import Inter from './max/Inter';
import Rewarded from './max/Rewarded';
import ProgBanner from './max/ProgBanner';
import NativeBanner from './max/NativeBanner';
import ProgMrec from './max/ProgMrec';
import NativeMrec from './max/NativeMrec';

const MaxDemoApp = () => {

  const Stack = createNativeStackNavigator();

  const navigationOptions = {
    //headerTintColor: 'black',
    headerStyle: {
      // primary max demo color
      backgroundColor: '#0583aa'
    },
  };

  const audioOption = ({route}) => {
    return ({...navigationOptions,
             title: 'AppLovin Demo App',
             headerRight: () =>
             <AudioSetting
               onMute={mute => {
                 AppLovinMAX.setMuted(mute);
               }}
             />
            });
  }

  const titleOption = ({route}) => {
    return ({...navigationOptions, title: route.params.name});
  }

  const screens = [
    {name: 'Main',         component: Main,         options: audioOption},
    {name: 'Inter',        component: Inter,        options: titleOption},
    {name: 'Rewarded',     component: Rewarded,     options: titleOption},
    {name: 'Banners',      component: Banners,      options: titleOption},
    {name: 'ProgBanner',   component: ProgBanner,   options: titleOption},
    {name: 'NativeBanner', component: NativeBanner, options: titleOption},
    {name: 'MRECs',        component: Mrecs,        options: titleOption},
    {name: 'ProgMrec',     component: ProgMrec,     options: titleOption},
    {name: 'NativeMrec',   component: NativeMrec,   options: titleOption},
    {name: 'Web',          component: Web,          options: titleOption},
  ];

  AppLovinMAX.initialize(Accounts.SDK_KEY, () => {
    AppLovinMAX.setVerboseLogging(true);
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {screens.map((screen, i) => (
          <Stack.Screen
            key={i}
            name={screen.name}
            component={screen.component}
            options={screen.options}
          />
        ))}
     </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MaxDemoApp;
