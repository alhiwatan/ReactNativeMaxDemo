import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

export const useLogMessage = initialValue => {
  const [logMessage, setLogMessage] = useState([]);
  return [
    logMessage,
    (msg) => {
      const newArray = [...logMessage , msg];
      setLogMessage(newArray);
    }
  ];
};

const Logger = ({data=[]}) => {

  const separator = () => {
    return (
      <View
        style={{
          backgroundColor: 'lightgray',
          height: 1,
        }}
      ></View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={data}
      renderItem={({item}) => (
        <View>
          <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        </View>
      )}
      ItemSeparatorComponent={separator}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    borderRadius: 10,
    margin: 20,
    padding: 8,
    backgroundColor: 'white',
  },
  item: {
    flex: 1,
    padding: 10,
  },
  itemText: {
    textAlign: 'center',
    fontSize: 12,
  },
});

export default Logger;
