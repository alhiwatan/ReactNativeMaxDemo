import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import AppLovinMAX from 'react-native-applovin-max';
import Accounts from './Accounts';
import Logger, {useLogMessage} from '../utils/Logger';

const MrecNative = ({navigation, route}) => {
  const [logMessage, logStatus] = useLogMessage([]);
  const [isShowing, setIsShowing] = useState(false);

  // MREC Ad Listeners
  AppLovinMAX.addEventListener('OnMRecAdLoadedEvent', (adInfo) => {
    logStatus('MREC ad loaded from ' + adInfo.networkName);
  });
  AppLovinMAX.addEventListener('OnMRecAdLoadFailedEvent', (errorInfo) => {
    logStatus('MREC ad failed to load with error code ' + errorInfo.code + ' and message: ' + errorInfo.message);
  });
  AppLovinMAX.addEventListener('OnMRecAdClickedEvent', (adInfo) => {
    logStatus('MREC ad clicked');
  });
  AppLovinMAX.addEventListener('OnMRecAdExpandedEvent', (adInfo) => {
    logStatus('MREC ad expanded')
  });
  AppLovinMAX.addEventListener('OnMRecAdCollapsedEvent', (adInfo) => {
    logStatus('MREC ad collapsed')
  });

  return (
    <View style={styles.container}>
      {
        (() => {
          if (isShowing) {
            return (
              <AppLovinMAX.AdView adUnitId={Accounts.MREC_AD_UNIT_ID}
                                  adFormat={AppLovinMAX.AdFormat.MREC}
                                  style={styles.mrec}/>
            );
          }
        })()
      }
      <Logger data={logMessage}/>
      <View style={styles.bottom}>
        <Button
          title={isShowing ? 'Hide' : 'Show'}
          onPress={() => {
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
  mrec: {
    width: '100%',
    height: 250,
    alignSelf: 'center',
    top: 8,
    bottom: 8,
  },
});

export default MrecNative;
