import React, {useState} from 'react';
import {Alert} from 'react-native';
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

const GdprConsentAlert = (onConsent = f => f) =>
      Alert.alert(
        'AppLovin Demo App',
        'Asks for your consent to use your personal data to:\n \
\n \
📶 Store and/or access information on a device\n \
\n \
🖥 Develop and improve products\n \
\n \
👤 Personalised ads and content, ad and content measurement, and audience insights',
        [
          {
            text: 'Do Not consent',
            onPress: () => onConsent(false),
            style: 'cancel'
          },
          {
            text: 'Consent',
            onPress: () => onConsent(true)
          },
        ],
        {cancelable: false}
      );

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

  AppLovinMAX.setVerboseLogging(true);

  AppLovinMAX.setPrivacyPolicyUrl('https://www.applovin.com/privacy/');
  AppLovinMAX.setTermsOfServiceUrl('https://www.applovin.com/terms/');
  AppLovinMAX.setConsentFlowEnabled(true);

  AppLovinMAX.initialize(Accounts.SDK_KEY, () => {
    switch (AppLovinMAX.getConsentDialogState()) {
    case AppLovinMAX.ConsentDialogState.UNKNOWN:
      break;
    case AppLovinMAX.ConsentDialogState.APPLIES:
      GdprConsentAlert((consented) => {AppLovinMAX.setHasUserConsent(consented)});
      break;
    case AppLovinMAX.ConsentDialogState.DOES_NOT_APPLY:
      break;
    }

    // TODO: Children Data, CCPA
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={screens[0].name}>
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
