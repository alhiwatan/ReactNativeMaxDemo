import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import AppLovinMAX from 'react-native-applovin-max';
import Accounts from './Accounts';
import Logger, {useLogMessage} from '../utils/Logger';

const ProgMrec = ({navigation, route}) => {
  const [logMessage, logStatus] = useLogMessage([]);
  const [isCreated, setIsCreated] = useState(false);
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

  useEffect(() => {
    if (!isCreated) {
      AppLovinMAX.createMRec(
        Accounts.MREC_AD_UNIT_ID,
        AppLovinMAX.AdViewPosition.CENTERED
      );

      setIsCreated(true);
    }
  },[]);

  useEffect(() => {
      navigation.addListener('beforeRemove', (e) => {
        AppLovinMAX.hideMRec(Accounts.MREC_AD_UNIT_ID);
        setIsShowing(false);
      })
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={{height:450}}/>
      <Logger data={logMessage}/>
      <View style={styles.bottom}>
        <Button
          title={isShowing ? 'Hide' : 'Show'}
          onPress={() => {
            if (isShowing) {
              AppLovinMAX.hideMRec(Accounts.MREC_AD_UNIT_ID);
            } else {

              if (!isCreated) {
                AppLovinMAX.createMRec(
                  Accounts.MREC_AD_UNIT_ID,
                  AppLovinMAX.AdViewPosition.CENTERED
                );

                setIsCreated(true);
              }

              AppLovinMAX.showMRec(Accounts.MREC_AD_UNIT_ID);
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

export default ProgMrec;
