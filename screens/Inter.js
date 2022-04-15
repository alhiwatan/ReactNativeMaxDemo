import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import AppLovinMAX from 'react-native-applovin-max';
import Account from '../Account';
import Logger from './Logger';
import adLoadState from './AdLoadState';

const Inter = ({navigation, route}) => {
  const [logMessage, setLogMessage] = useState([]);

  const logStatus = (msg) => {
    const newArray = [...logMessage , msg];
    setLogMessage(newArray);
  }

  const [interstitialAdLoadState, setInterstitialAdLoadState] = useState(adLoadState.notLoaded);
  const [interstitialRetryAttempt, setInterstitialRetryAttempt] = useState(0);

  // Interstitial Listeners
  AppLovinMAX.addEventListener('OnInterstitialLoadedEvent', (adInfo) => {
    setInterstitialAdLoadState(adLoadState.loaded);

    // Interstitial ad is ready to be
    // shown. AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID)
    // will now return 'true'
    　logStatus('Interstitial ad loaded from ' + adInfo.networkName);

    // Reset retry attempt
    setInterstitialRetryAttempt(0)
  });

  AppLovinMAX.addEventListener('OnInterstitialLoadFailedEvent', (errorInfo) => {
    // Interstitial ad failed to load
    // We recommend retrying with exponentially higher delays up to a
    // maximum delay (in this case 64 seconds)
    setInterstitialRetryAttempt(interstitialRetryAttempt + 1);

    const retryDelay = Math.pow(2, Math.min(6, interstitialRetryAttempt));
    logStatus('Interstitial ad failed to load with code ' +
              errorInfo.code + ' - retrying in ' + retryDelay + 's');

    setTimeout(function () {
      AppLovinMAX.loadInterstitial(Account.INTERSTITIAL_AD_UNIT_ID);
    }, retryDelay * 1000);
  });

  AppLovinMAX.addEventListener('OnInterstitialClickedEvent', (adInfo) => {
    logStatus('Interstitial ad clicked');
  });

  AppLovinMAX.addEventListener('OnInterstitialDisplayedEvent', (adInfo) => {
    logStatus('Interstitial ad displayed');
  });

  AppLovinMAX.addEventListener('OnInterstitialAdFailedToDisplayEvent', (adInfo) => {
    setInterstitialAdLoadState(adLoadState.notLoaded);
    logStatus('Interstitial ad failed to display');
  });

  AppLovinMAX.addEventListener('OnInterstitialHiddenEvent', (adInfo) => {
    setInterstitialAdLoadState(adLoadState.notLoaded);
    logStatus('Interstitial ad hidden');
  });

  // when this screen is loaded
  useEffect(() => {
    if (!AppLovinMAX.isInterstitialReady(Account.INTERSTITIAL_AD_UNIT_ID)) {
      logStatus('Loading interstitial ad...');
      setInterstitialAdLoadState(adLoadState.loading);
      AppLovinMAX.loadInterstitial(Account.INTERSTITIAL_AD_UNIT_ID);
    }
  },[])

  return (
    <View style={styles.container}>
      <Logger data={logMessage}/>
      <View style={styles.bottom}>
        <Button
          title={(interstitialAdLoadState === adLoadState.loading) ? 'Loading' : 'Show'}
          disabled={interstitialAdLoadState === adLoadState.loading}
          onPress={() => {
            if (AppLovinMAX.isInterstitialReady(Account.INTERSTITIAL_AD_UNIT_ID)) {
              AppLovinMAX.showInterstitial(Account.INTERSTITIAL_AD_UNIT_ID);
            } else {
              logStatus('Loading interstitial ad...');
              setInterstitialAdLoadState(adLoadState.loading);
              AppLovinMAX.loadInterstitial(Account.INTERSTITIAL_AD_UNIT_ID);
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
