import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import AppLovinMAX from 'react-native-applovin-max';
import Accounts from './Accounts';
import Logger, {useLogMessage} from '../utils/Logger';
import AdLoadState from './AdLoadState';

const Inter = ({navigation, route}) => {
  const [logMessage, logStatus] = useLogMessage([]);
  const [loadState, setLoadState] = useState(AdLoadState.notLoaded);
  const [retryAttempt, setRetryAttempt] = useState(0);

  // Interstitial Listeners
  AppLovinMAX.addEventListener('OnInterstitialLoadedEvent', (adInfo) => {
    setLoadState(AdLoadState.loaded);

    // Interstitial ad is ready to be
    // shown. AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID)
    // will now return 'true'
    logStatus('Interstitial ad loaded from ' + adInfo.networkName);

    // Reset retry attempt
    setRetryAttempt(0)
  });

  AppLovinMAX.addEventListener('OnInterstitialLoadFailedEvent', (errorInfo) => {
    // Interstitial ad failed to load
    // We recommend retrying with exponentially higher delays up to a
    // maximum delay (in this case 64 seconds)
    setRetryAttempt(retryAttempt + 1);

    const retryDelay = Math.pow(2, Math.min(6, retryAttempt));
    logStatus('Interstitial ad failed to load with code ' +
              errorInfo.code + ' - retrying in ' + retryDelay + 's');

    setTimeout(function () {
      AppLovinMAX.loadInterstitial(Accounts.INTERSTITIAL_AD_UNIT_ID);
    }, retryDelay * 1000);
  });

  AppLovinMAX.addEventListener('OnInterstitialClickedEvent', (adInfo) => {
    logStatus('Interstitial ad clicked');
  });

  AppLovinMAX.addEventListener('OnInterstitialDisplayedEvent', (adInfo) => {
    logStatus('Interstitial ad displayed');
  });

  AppLovinMAX.addEventListener('OnInterstitialAdFailedToDisplayEvent', (adInfo) => {
    setLoadState(AdLoadState.notLoaded);
    logStatus('Interstitial ad failed to display');
  });

  AppLovinMAX.addEventListener('OnInterstitialHiddenEvent', (adInfo) => {
    setLoadState(AdLoadState.notLoaded);
    logStatus('Interstitial ad hidden');
  });

  // when this screen is loaded
  useEffect(() => {
    if (!AppLovinMAX.isInterstitialReady(Accounts.INTERSTITIAL_AD_UNIT_ID)) {
      logStatus('Loading interstitial ad...');
      setLoadState(AdLoadState.loading);
      AppLovinMAX.loadInterstitial(Accounts.INTERSTITIAL_AD_UNIT_ID);
    }
  },[])

  return (
    <View style={styles.container}>
      <Logger data={logMessage}/>
      <View style={styles.bottom}>
        <Button
          title={(loadState === AdLoadState.loading) ? 'Loading' : 'Show'}
          disabled={loadState === AdLoadState.loading}
          onPress={() => {
            if (AppLovinMAX.isInterstitialReady(Accounts.INTERSTITIAL_AD_UNIT_ID)) {
              AppLovinMAX.showInterstitial(Accounts.INTERSTITIAL_AD_UNIT_ID);
            } else {
              logStatus('Loading interstitial ad...');
              setLoadState(AdLoadState.loading);
              AppLovinMAX.loadInterstitial(Accounts.INTERSTITIAL_AD_UNIT_ID);
            }
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

export default Inter;
