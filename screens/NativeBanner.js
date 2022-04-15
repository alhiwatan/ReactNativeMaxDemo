import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import AppLovinMAX from 'react-native-applovin-max';
import Account from '../Account';
import Logger from './Logger';
import adLoadState from './AdLoadState';

const NativeBanner = ({navigation, route}) => {
  const [logMessage, setLogMessage] = useState([]);

  const logStatus = (msg) => {
    const newArray = [...logMessage , msg];
    setLogMessage(newArray);
  }

  const [isNativeUIBannerShowing, setIsNativeUIBannerShowing] = useState(false);

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

  return (
    <View style={styles.container}>
      <Logger data={logMessage}/>
      {
        (() => {
          if (isNativeUIBannerShowing) {
            return (
              <AppLovinMAX.AdView adUnitId={Account.BANNER_AD_UNIT_ID}
                                  adFormat={AppLovinMAX.AdFormat.BANNER}
                                  style={styles.banner}/>
            );
          }
        })()
      }
      <View style={styles.bottom}>
        <Button
          title={isNativeUIBannerShowing ? 'Hide' : 'Show'}
          onPress={() => {
            setIsNativeUIBannerShowing(!isNativeUIBannerShowing);
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
  banner: {
    // Set background color for banners to be fully functional
    backgroundColor: '#000000',
    //width: '100%',
    //height: AppLovinMAX.isTablet() ? 90 : 50,
    alignSelf: 'center',
    bottom: 8,
  },
});

export default NativeBanner;
