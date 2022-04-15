import React from 'react';
import {View, StyleSheet} from 'react-native';
import AppLovinMAX from 'react-native-applovin-max';
import MenuList from './MenuList';

const Mrecs = ({navigation, route}) => {

  const pushScreen = (key, name) => {
    navigation.push(key, {name: name});
  }

  const MrecMenu = [
    {key: 'ProgMrec',   name: 'Programmatic MREC', func: pushScreen},
    {key: 'NativeMrec', name: 'Native UI MREC',    func: pushScreen},
  ];

  return (
    <View style={styles.container}>
      <MenuList
        data={MrecMenu}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Mrecs;
