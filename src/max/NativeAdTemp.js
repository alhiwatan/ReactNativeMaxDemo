import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import AppLovinMAX from 'react-native-applovin-max';
import Accounts from './Accounts';
import Logger, {useLogMessage} from '../utils/Logger';

const NativeAdTemp = ({navigation, route}) => {
  const [logMessage, logStatus] = useLogMessage([]);
  const [isCreated, setIsCreated] = useState(false);
  const [isShowing, setIsShowing] = useState(false);

  // Native Ad Listeners
  AppLovinMAX.addEventListener('OnNativeAdLoadedEvent', (adInfo) => {
    logStatus('Native ad loaded from ' + adInfo.networkName);
  });
  AppLovinMAX.addEventListener('OnNativeAdLoadFailedEvent', (errorInfo) => {
    logStatus('Native ad failed to load with error code ' + errorInfo.code +
              ' and message: ' + errorInfo.message);
  });
  AppLovinMAX.addEventListener('OnNativeAdClickedEvent', (adInfo) => {
    logStatus('Native ad clicked');
  });
  AppLovinMAX.addEventListener('OnNativeAdExpandedEvent', (adInfo) => {
    logStatus('Native ad expanded')
  });
  AppLovinMAX.addEventListener('OnNativeAdCollapsedEvent', (adInfo) => {
    logStatus('Native ad collapsed')
  });

  useEffect(() => {
    if (!isCreated) {
      //
      // Programmatic banner creation - banners are automatically
      // sized to 320x50 on phones and 728x90 on tablets
      //
      AppLovinMAX.createNative(Accounts.NATIVE_SMALL_AD_UNIT_ID, AppLovinMAX.AdNativeTemplate.SMALL, 0, 0);
      AppLovinMAX.createNative(Accounts.NATIVE_MEDIUM_AD_UNIT_ID, AppLovinMAX.AdNativeTemplate.MEDIUM, 0, 0);

      // Set background color for banners to be fully functional
      // In this case we are setting it to black - PLEASE USE HEX STRINGS ONLY
      AppLovinMAX.setNativeBackgroundColor(Accounts.NATIVE_SMALL_AD_UNIT_ID, '#d3d3d3');
      AppLovinMAX.setNativeBackgroundColor(Accounts.NATIVE_MEDIUM_AD_UNIT_ID, '#d3d3d3');

      setIsCreated(true);
    }
  },[]);

  useEffect(() => {
      navigation.addListener('beforeRemove', (e) => {
        AppLovinMAX.hideNative(Accounts.BANNER_AD_UNIT_ID);
      })
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={AppLovinMAX.isTablet() ? {height:90} : {height:50}}/>
      <Logger data={logMessage}/>
      <View style={styles.bottom}>
        <Button
          title={isShowing ? 'Hide' : 'Show'}
          onPress={() => {
            if (isShowing) {
              AppLovinMAX.hideNative(Accounts.BANNER_AD_UNIT_ID);
            } else {

              if (!isCreated) {
                //
                // Programmatic banner creation - banners are
                // automatically sized to 320x50 on phones and 728x90
                // on tablets
                //
                AppLovinMAX.createNativeWithOffsets(
                  Accounts.BANNER_AD_UNIT_ID,
                  AppLovinMAX.AdViewPosition.TOP_CENTER, 0, 50
                );

                // Set background color for banners to be fully functional
                // In this case we are setting it to black - PLEASE USE HEX STRINGS ONLY
                AppLovinMAX.setNativeBackgroundColor(Accounts.BANNER_AD_UNIT_ID, '#d3d3d3');

                setIsCreated(true);
              }

              AppLovinMAX.showNative(Accounts.BANNER_AD_UNIT_ID);
            }

            setIsShowing(!isShowing);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  bottom: {
    paddingBottom: 30,
  },
});

export default NativeAdTemp;
