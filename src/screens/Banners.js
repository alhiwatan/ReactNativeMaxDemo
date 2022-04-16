import React from 'react';
import {View, StyleSheet} from 'react-native';
import AppLovinMAX from 'react-native-applovin-max';
import MenuList from '../utils/MenuList';

const Banners = ({navigation, route}) => {

  const pushScreen = (key, name) => {
    navigation.push(key, {name: name});
  }

  const BannerMenu = [
    {key: 'ProgBanner',   name: 'Programmatic Banner', func: pushScreen},
    {key: 'NativeBanner', name: 'Native UI Banner',    func: pushScreen},
  ];

  return (
    <View style={styles.container}>
      <MenuList
        data={BannerMenu}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Banners;
