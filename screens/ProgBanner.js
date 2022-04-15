import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import AppLovinMAX from 'react-native-applovin-max';
import Account from '../Account';
import Logger from './Logger';
import adLoadState from './AdLoadState';

const ProgBanner = ({navigation, route}) => {
  const [logMessage, setLogMessage] = useState([]);

  const logStatus = (msg) => {
    const newArray = [...logMessage , msg];
    setLogMessage(newArray);
  }

  const [isProgrammaticBannerCreated, setIsProgrammaticBannerCreated] = useState(false);
  const [isProgrammaticBannerShowing, setIsProgrammaticBannerShowing] = useState(false);

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
    if (!isProgrammaticBannerCreated) {

      //
      // Programmatic banner creation - banners are automatically sized to 320x50 on phones and 728x90 on tablets
      //
      AppLovinMAX.createBannerWithOffsets(
        Account.BANNER_AD_UNIT_ID,
        AppLovinMAX.AdViewPosition.TOP_CENTER, 0, 50
      );

      // Set background color for banners to be fully functional
      // In this case we are setting it to black - PLEASE USE HEX STRINGS ONLY
      AppLovinMAX.setBannerBackgroundColor(Account.BANNER_AD_UNIT_ID, '#d3d3d3');

      setIsProgrammaticBannerCreated(true);
    }
  },[]);

  useEffect(() => {
      navigation.addListener('beforeRemove', (e) => {
        AppLovinMAX.hideBanner(Account.BANNER_AD_UNIT_ID);
      })
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={AppLovinMAX.isTablet() ? {height:90} : {height:50}}/>
      <Logger data={logMessage}/>
      <View style={styles.bottom}>
        <Button
          title={isProgrammaticBannerShowing ? 'Hide' : 'Show'}
          onPress={() => {
            if (isProgrammaticBannerShowing) {
              AppLovinMAX.hideBanner(Account.BANNER_AD_UNIT_ID);
            } else {

              if (!isProgrammaticBannerCreated) {
                //
                // Programmatic banner creation - banners are automatically sized to 320x50 on phones and 728x90 on tablets
                //
                AppLovinMAX.createBannerWithOffsets(
                  Account.BANNER_AD_UNIT_ID,
                  AppLovinMAX.AdViewPosition.TOP_CENTER, 0, 50
                );

                // Set background color for banners to be fully functional
                // In this case we are setting it to black - PLEASE USE HEX STRINGS ONLY
                AppLovinMAX.setBannerBackgroundColor(Account.BANNER_AD_UNIT_ID, '#d3d3d3');

                setIsProgrammaticBannerCreated(true);
              }

              AppLovinMAX.showBanner(Account.BANNER_AD_UNIT_ID);
            }

            setIsProgrammaticBannerShowing(!isProgrammaticBannerShowing);
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

export default ProgBanner;
