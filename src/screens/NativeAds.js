import React from 'react';
import {View, StyleSheet} from 'react-native';
import MenuList from '../utils/MenuList';

const NativeAds = ({navigation, route}) => {

  const pushScreen = (key, name) => {
    navigation.push(key, {name: name});
  }

  const NativeAdMenu = [
    {key: 'NativeAdTemp', name: 'Template API', func: pushScreen},
    {key: 'NativeAdManual',   name: 'Manual API',   func: pushScreen},
  ];

  return (
    <View style={styles.container}>
      <MenuList
        data={NativeAdMenu}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NativeAds;
