import React from 'react';
import {View, StyleSheet} from 'react-native';
import MenuList from '../utils/MenuList';

const Mrecs = ({navigation, route}) => {

  const pushScreen = (key, name) => {
    navigation.push(key, {name: name});
  }

  const MrecMenu = [
    {key: 'MrecProg',   name: 'Programmatic MREC', func: pushScreen},
    {key: 'MrecNative', name: 'Native UI MREC',    func: pushScreen},
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
