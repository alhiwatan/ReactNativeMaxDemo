import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import AppLovinMAX from 'react-native-applovin-max';
import MenuList from '../utils/MenuList';
import Accounts from '../max/Accounts';

const Main = ({navigation, route}) => {

  const pushScreen = (key, name) => {
    navigation.push(key, {name: name});
  }

  const startMD = () => {
    if (AppLovinMAX.isInitialized()) {
      AppLovinMAX.showMediationDebugger();
    }
  }

  const startWeb = (key, name) => {
    navigation.push(key, {name: name, url: Accounts.SUPPORT_URL});
  }

  const MaxMenu = [
    {key: 'Inter',    name: 'Interstitials',             func: pushScreen},
    {key: 'Rewarded', name: 'Rewarded',                  func: pushScreen},
    {key: 'Banners',  name: 'Banners',                   func: pushScreen},
    {key: 'MRECs',    name: 'MRECs',                     func: pushScreen},
    {key: 'Native',   name: 'Native Ads',                func: pushScreen},
    {key: 'MD',       name: 'Launch Mediation Debugger', func: startMD},
  ];

  const SupportMenu = [
    {key: 'Web',      name: 'Visit our Support Site',    func: startWeb},
  ]

  return (
    <View style={styles.container}>
      <Text style={[styles.title, {flexGrow: 0}]}>Max</Text>
      <MenuList
        style={{flexGrow: 0}}
        data={MaxMenu}
      />
      <Text style={[styles.title, {flexGrow: 0}]}>Support</Text>
      <MenuList
        style={{flexGrow: 0}}
        data={SupportMenu}
      />
      <View style={[styles.version, {flexGrow: 1}]}>
        <Text>{Platform.OS} version: {Platform.Version}</Text>
        <Text>Language: React Native</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  title: {
    padding: 10,
    backgroundColor: 'lightgray',
    fontWeight: "bold",
  },
  version: {
    padding: 10,
    backgroundColor: 'lightgray',
    alignItems: 'center',
  },
});

export default Main;
