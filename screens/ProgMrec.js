import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import AppLovinMAX from 'react-native-applovin-max';
import Account from '../Account';
import Logger from './Logger';
import adLoadState from './AdLoadState';

const ProgMrec = ({navigation, route}) => {
  const [logMessage, setLogMessage] = useState([]);

  const logStatus = (msg) => {
    const newArray = [...logMessage , msg];
    setLogMessage(newArray);
  }

  const [isProgrammaticMRecCreated, setIsProgrammaticMRecCreated] = useState(false);
  const [isProgrammaticMRecShowing, setIsProgrammaticMRecShowing] = useState(false);

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
    if (!isProgrammaticMRecCreated) {
      AppLovinMAX.createMRec(
        Account.MREC_AD_UNIT_ID,
        AppLovinMAX.AdViewPosition.CENTERED
      );

      setIsProgrammaticMRecCreated(true);
    }
  },[]);

  useEffect(() => {
      navigation.addListener('beforeRemove', (e) => {
        AppLovinMAX.hideMRec(Account.MREC_AD_UNIT_ID);
        setIsProgrammaticMRecShowing(false);
      })
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={{height:450}}/>
      <Logger data={logMessage}/>
      <View style={styles.bottom}>
        <Button
          title={isProgrammaticMRecShowing ? 'Hide' : 'Show'}
          onPress={() => {
            if (isProgrammaticMRecShowing) {
              AppLovinMAX.hideMRec(Account.MREC_AD_UNIT_ID);
            } else {

              if (!isProgrammaticMRecCreated) {
                AppLovinMAX.createMRec(
                  Account.MREC_AD_UNIT_ID,
                  AppLovinMAX.AdViewPosition.CENTERED
                );

                setIsProgrammaticMRecCreated(true);
              }

              AppLovinMAX.showMRec(Account.MREC_AD_UNIT_ID);
            }

            setIsProgrammaticMRecShowing(!isProgrammaticMRecShowing);
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
