import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const Support = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: 'https://support.applovin.com/support/home' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Support;
