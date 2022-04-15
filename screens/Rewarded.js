import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import AppLovinMAX from 'react-native-applovin-max';
import Account from '../Account';
import Logger from './Logger';
import adLoadState from './AdLoadState';

const Rewarded = ({navigation, route}) => {
  const [logMessage, setLogMessage] = useState([]);

  const logStatus = (msg) => {
    const newArray = [...logMessage , msg];
    setLogMessage(newArray);
  }

  const [rewardedAdLoadState, setRewardedAdLoadState] = useState(adLoadState.notLoaded);
  const [rewardedAdRetryAttempt, setRewardedAdRetryAttempt] = useState(0);

  // Rewarded Ad Listeners
  AppLovinMAX.addEventListener('OnRewardedAdLoadedEvent', (adInfo) => {
    setRewardedAdLoadState(adLoadState.loaded);

    // Rewarded ad is ready to be
    // shown. AppLovinMAX.isRewardedAdReady(REWARDED_AD_UNIT_ID) will
    // now return 'true'
    logStatus('Rewarded ad loaded from ' + adInfo.networkName);

    // Reset retry attempt
    setRewardedAdRetryAttempt(0);
  });

  AppLovinMAX.addEventListener('OnRewardedAdLoadFailedEvent', (errorInfo) => {
    setRewardedAdLoadState(adLoadState.notLoaded);

    // Rewarded ad failed to load
    // We recommend retrying with exponentially higher delays up to a
    // * maximum delay (in this case 64 seconds)

    setRewardedAdRetryAttempt(rewardedAdRetryAttempt + 1);

    var retryDelay = Math.pow(2, Math.min(6, rewardedAdRetryAttempt));
    logStatus('Rewarded ad failed to load with code ' + errorInfo.code +
              ' - retrying in ' + retryDelay + 's');

    setTimeout(function () {
      AppLovinMAX.loadRewardedAd(Account.REWARDED_AD_UNIT_ID);
    }, retryDelay * 1000);
  });

  AppLovinMAX.addEventListener('OnRewardedAdClickedEvent', (adInfo) => {
    logStatus('Rewarded ad clicked');
  });

  AppLovinMAX.addEventListener('OnRewardedAdDisplayedEvent', (adInfo) => {
    logStatus('Rewarded ad displayed');
  });

  AppLovinMAX.addEventListener('OnRewardedAdFailedToDisplayEvent', (adInfo) => {
    setRewardedAdLoadState(adLoadState.notLoaded);
    logStatus('Rewarded ad failed to display');
  });

  AppLovinMAX.addEventListener('OnRewardedAdHiddenEvent', (adInfo) => {
    setRewardedAdLoadState(adLoadState.notLoaded);
    logStatus('Rewarded ad hidden');
  });

  AppLovinMAX.addEventListener('OnRewardedAdReceivedRewardEvent', (adInfo) => {
      logStatus('Rewarded ad granted reward');
    });

  useEffect(() => {
    if (!AppLovinMAX.isRewardedAdReady(Account.REWARDED_AD_UNIT_ID)) {
      logStatus('Loading rewarded ad...');
      setRewardedAdLoadState(adLoadState.loading);
      AppLovinMAX.loadRewardedAd(Account.REWARDED_AD_UNIT_ID);
    }
  },[])

  return (
    <View style={styles.container}>
      <Logger data={logMessage}/>
      <View style={styles.bottom}>
        <Button
          title={(rewardedAdLoadState === adLoadState.loading) ? 'Loading' : 'Show'}
          disabled={rewardedAdLoadState === adLoadState.loading}
          onPress={() => {
            if (AppLovinMAX.isRewardedAdReady(Account.REWARDED_AD_UNIT_ID)) {
              AppLovinMAX.showRewardedAd(Account.REWARDED_AD_UNIT_ID);
            } else {
              logStatus('Loading rewarded ad...');
              setRewardedAdLoadState(adLoadState.loading);
              AppLovinMAX.loadRewardedAd(Account.REWARDED_AD_UNIT_ID);
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
