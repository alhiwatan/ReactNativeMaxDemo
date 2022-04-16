import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import AppLovinMAX from 'react-native-applovin-max';
import Accounts from './Accounts';
import Logger, {useLogMessage} from '../utils/Logger';

const BannerProg = ({navigation, route}) => {
  const [logMessage, logStatus] = useLogMessage([]);
  const [isCreated, setIsCreated] = useState(false);
  const [isShowing, setIsShowing] = useState(false);

  // Banner Ad Listeners
  AppLovinMAX.addEventListener('OnBannerAdLoadedEvent', (adInfo) => {
    logStatus('Banner ad loaded from ' + adInfo.networkName);
  });
  AppLovinMAX.addEventListener('OnBannerAdLoadFailedEvent', (errorInfo) => {
    logStatus('Banner ad failed to load with error code ' + errorInfo.code +
              ' and message: ' + errorInfo.message);
  });
  AppLovinMAX.addEventListener('OnBannerAdClickedEvent', (adInfo) => {
    logStatus('Banner ad clicked');
  });
  AppLovinMAX.addEventListener('OnBannerAdExpandedEvent', (adInfo) => {
    logStatus('Banner ad expanded')
  });
  AppLovinMAX.addEventListener('OnBannerAdCollapsedEvent', (adInfo) => {
    logStatus('Banner ad collapsed')
  });

  useEffect(() => {
    if (!isCreated) {
      //
      // Programmatic banner creation - banners are automatically
      // sized to 320x50 on phones and 728x90 on tablets
      //
      let offsetY = AppLovinMAX.isTablet() ? 100 : 60;
      AppLovinMAX.createBannerWithOffsets(
        Accounts.BANNER_AD_UNIT_ID,
        AppLovinMAX.AdViewPosition.TOP_CENTER, 0, offsetY
      );

      // Set background color for banners to be fully functional
      // In this case we are setting it to black - PLEASE USE HEX STRINGS ONLY
      AppLovinMAX.setBannerBackgroundColor(Accounts.BANNER_AD_UNIT_ID, '#d3d3d3');

      setIsCreated(true);
    }
  },[]);

  useEffect(() => {
      navigation.addListener('beforeRemove', (e) => {
        AppLovinMAX.hideBanner(Accounts.BANNER_AD_UNIT_ID);
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
              AppLovinMAX.hideBanner(Accounts.BANNER_AD_UNIT_ID);
            } else {
              AppLovinMAX.showBanner(Accounts.BANNER_AD_UNIT_ID);
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

export default BannerProg;
