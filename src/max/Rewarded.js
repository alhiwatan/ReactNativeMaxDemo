import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import AppLovinMAX from 'react-native-applovin-max';
import Accounts from './Accounts';
import Logger, {useLogMessage} from '../utils/Logger';
import AdLoadState from './AdLoadState';

const Rewarded = ({navigation, route}) => {
  const [logMessage, logStatus] = useLogMessage([]);
  const [loadState, setLoadState] = useState(AdLoadState.notLoaded);
  const [retryAttempt, setRetryAttempt] = useState(0);

  // Rewarded Ad Listeners
  AppLovinMAX.addEventListener('OnRewardedAdLoadedEvent', (adInfo) => {
    setLoadState(AdLoadState.loaded);

    // Rewarded ad is ready to be
    // shown. AppLovinMAX.isRewardedAdReady(REWARDED_AD_UNIT_ID) will
    // now return 'true'
    logStatus('Rewarded ad loaded from ' + adInfo.networkName);

    // Reset retry attempt
    setRetryAttempt(0);
  });

  AppLovinMAX.addEventListener('OnRewardedAdLoadFailedEvent', (errorInfo) => {
    setLoadState(AdLoadState.notLoaded);

    // Rewarded ad failed to load
    // We recommend retrying with exponentially higher delays up to a
    // * maximum delay (in this case 64 seconds)

    setRetryAttempt(retryAttempt + 1);

    var retryDelay = Math.pow(2, Math.min(6, retryAttempt));
    logStatus('Rewarded ad failed to load with code ' + errorInfo.code +
              ' - retrying in ' + retryDelay + 's');

    setTimeout(function () {
      AppLovinMAX.loadRewardedAd(Accounts.REWARDED_AD_UNIT_ID);
    }, retryDelay * 1000);
  });

  AppLovinMAX.addEventListener('OnRewardedAdClickedEvent', (adInfo) => {
    logStatus('Rewarded ad clicked');
  });

  AppLovinMAX.addEventListener('OnRewardedAdDisplayedEvent', (adInfo) => {
    logStatus('Rewarded ad displayed');
  });

  AppLovinMAX.addEventListener('OnRewardedAdFailedToDisplayEvent', (adInfo) => {
    setLoadState(AdLoadState.notLoaded);
    logStatus('Rewarded ad failed to display');
  });

  AppLovinMAX.addEventListener('OnRewardedAdHiddenEvent', (adInfo) => {
    setLoadState(AdLoadState.notLoaded);
    logStatus('Rewarded ad hidden');
  });

  AppLovinMAX.addEventListener('OnRewardedAdReceivedRewardEvent', (adInfo) => {
      logStatus('Rewarded ad granted reward');
    });

  useEffect(() => {
    if (!AppLovinMAX.isRewardedAdReady(Accounts.REWARDED_AD_UNIT_ID)) {
      logStatus('Loading rewarded ad...');
      setLoadState(AdLoadState.loading);
      AppLovinMAX.loadRewardedAd(Accounts.REWARDED_AD_UNIT_ID);
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
            if (AppLovinMAX.isRewardedAdReady(Accounts.REWARDED_AD_UNIT_ID)) {
              AppLovinMAX.showRewardedAd(Accounts.REWARDED_AD_UNIT_ID);
            } else {
              logStatus('Loading rewarded ad...');
              setLoadState(AdLoadState.loading);
              AppLovinMAX.loadRewardedAd(Accounts.REWARDED_AD_UNIT_ID);
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

export default Rewarded;
