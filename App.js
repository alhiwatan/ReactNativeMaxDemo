import React, {useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/AntDesign';
import AppLovinMAX from 'react-native-applovin-max';
import Account from './Account';
import Main from './screens/Main';
import Inter from './screens/Inter';
import Rewarded from './screens/Rewarded';
import Banners from './screens/Banners';
import ProgBanner from './screens/ProgBanner';
import NativeBanner from './screens/NativeBanner';
import Mrecs from './screens/Mrecs';
import ProgMrec from './screens/ProgMrec';
import NativeMrec from './screens/NativeMrec';
import Support from './screens/Support';

const Stack = createNativeStackNavigator();

const navigationOptions = {
  //headerTintColor: 'black',
  headerStyle: {
    // primary max demo color
    backgroundColor: '#0583aa'
  },
};

const AudioSetting = ({mute=false, onMute = f => f}) => {
  const [muted, setMuted] = useState(mute);

  return (
      <TouchableOpacity
        onPress={() => {setMuted(!muted); onMute(!muted);}}>
        <Image
          style={{ width: 24, height: 24 }}
          source={muted ? require('./images/mute.png') : require('./images/unmute.png')}
        />
      </TouchableOpacity>
  );
}

const App = () => {

  AppLovinMAX.initialize(Account.SDK_KEY, () => {
    AppLovinMAX.setVerboseLogging(true);
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Main'
          component={Main}
          options={({...navigationOptions,
                     title: 'AppLovin Demo App',
                     headerRight: () =>
                     <AudioSetting
                       onMute={mute => {
                         AppLovinMAX.setMuted(mute);
                       }}
                     />
                    })}
        />
        <Stack.Screen
          name='Inter'
          component={Inter}
          options={({route}) => ({...navigationOptions, title: route.params.name})}
        />
        <Stack.Screen
          name='Rewarded'
          component={Rewarded}
          options={({route}) => ({...navigationOptions, title: route.params.name})}
        />
        <Stack.Screen
          name='Banners'
          component={Banners}
          options={({route}) => ({...navigationOptions, title: route.params.name})}
        />
        <Stack.Screen
          name='ProgBanner'
          component={ProgBanner}
          options={({route}) => ({...navigationOptions, title: route.params.name})}
        />
        <Stack.Screen
          name='NativeBanner'
          component={NativeBanner}
          options={({route}) => ({...navigationOptions, title: route.params.name})}
        />
        <Stack.Screen
          name='MRECs'
          component={Mrecs}
          options={({route}) => ({...navigationOptions, title: route.params.name})}
        />
        <Stack.Screen
          name='ProgMrec'
          component={ProgMrec}
          options={({route}) => ({...navigationOptions, title: route.params.name})}
        />
        <Stack.Screen
          name='NativeMrec'
          component={NativeMrec}
          options={({route}) => ({...navigationOptions, title: route.params.name})}
        />
        <Stack.Screen
          name='Support'
          component={Support}
          options={({route}) => ({...navigationOptions, title: route.params.name})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
