import React, {useState} from 'react';
import {Platform, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/AntDesign';
import AppLovinMAX from 'react-native-applovin-max';

import AudioSetting from './utils/AudioSetting';
import Main from './screens/Main';
import Banners from './screens/Banners';
import Mrecs from './screens/Mrecs';
import Web from './screens/Web';
import NativeAds from './screens/NativeAds';
import Accounts from './max/Accounts';
import Inter from './max/Inter';
import Rewarded from './max/Rewarded';
import BannerProg from './max/BannerProg';
import BannerNative from './max/BannerNative';
import MrecProg from './max/MrecProg';
import MrecNative from './max/MrecNative';
import NativeAdTemp from './max/NativeAdTemp';

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
      backgroundColor: '#0583aa',
    },
    headerTitleStyle: {
      color:'black'
    },
    headerTintColor: 'ghostwhite'
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

  // register all screens to the stack navigation up front - don't know how
  // to add them as needed
  const screens = [
    {name: 'Main',         component: Main,         options: audioOption},
    {name: 'Inter',        component: Inter,        options: titleOption},
    {name: 'Rewarded',     component: Rewarded,     options: titleOption},
    {name: 'Banners',      component: Banners,      options: titleOption},
    {name: 'BannerProg',   component: BannerProg,   options: titleOption},
    {name: 'BannerNative', component: BannerNative, options: titleOption},
    {name: 'MRECs',        component: Mrecs,        options: titleOption},
    {name: 'MrecProg',     component: MrecProg,     options: titleOption},
    {name: 'MrecNative',   component: MrecNative,   options: titleOption},
    {name: 'Web',          component: Web,          options: titleOption},
    {name: 'Native',       component: NativeAds,    options: titleOption},
    {name: 'NativeAdTemp', component: NativeAdTemp, options: titleOption},
  ];

  AppLovinMAX.setVerboseLogging(true);

  if (Platform.OS === 'ios' && parseFloat(Platform.Version) >= 14.5) {
    // Enable the iOS consent flow programmatically -
    // NSUserTrackingUsageDescription must be added to the Info.plist
    AppLovinMAX.setPrivacyPolicyUrl('https://www.applovin.com/privacy/');
    AppLovinMAX.setTermsOfServiceUrl('https://www.applovin.com/terms/');
    AppLovinMAX.setConsentFlowEnabled(true);
  }

  AppLovinMAX.initialize(Accounts.SDK_KEY, (configuration) => {
    //if (Platform.OS === 'android') {
    //  AppLovinMAX.showConsentDialog(() => {});
    //}
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
