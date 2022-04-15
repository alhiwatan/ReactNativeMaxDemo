import {Platform} from 'react-native';

const SDK_KEY = 'DFNudNMslny8XkL-Va8uMd37MO7bpOZJhQTi0yTB2TVe_T0NEECt1DEM38p5u3ndebhm4mAmO0kcRUv0KchTLr';

const INTERSTITIAL_AD_UNIT_ID = Platform.select({
  ios: 'f85d065eafb1df38',
  android: '9a30bf35b3626631',
});

const REWARDED_AD_UNIT_ID = Platform.select({
  ios: 'a4d965ad22e0a51d',
  android: '5ba71fb70f2a70ea',
});

const BANNER_AD_UNIT_ID = Platform.select({
  ios: 'b94809f97db8f952',
  android: '78fd97fff94f5283',
});

const MREC_AD_UNIT_ID = Platform.select({
  ios: '22d8e8eb2b3497ae',
  android: 'c935a27914e661dc',
});

export default {
  SDK_KEY,
  INTERSTITIAL_AD_UNIT_ID,
  REWARDED_AD_UNIT_ID,
  BANNER_AD_UNIT_ID,
  MREC_AD_UNIT_ID,
};

//////////////////////////////////////////////
//
// HOW TO UPDATE BUNDLE ID
//
// % npx react-native-rename -b xxx.xxx.xxx
