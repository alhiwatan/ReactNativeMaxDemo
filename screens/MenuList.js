import React from 'react';
import {View, Text, Button, Image, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const MenuList = ({style={}, data=[]}) => {

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

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        item.func(item.key, item.name);
      }}>
      <View style={styles.item}>
        <Text style={styles.text}>{item.name}</Text>
        <Icon name="right" size={12} style={styles.icon}/>
      </View>
    </TouchableOpacity>
  );

  return (
      <FlatList
        style={style}
        data={data}
        renderItem={(item) => renderItem(item)}
        keyExtractor={(item) => item.key}
        ItemSeparatorComponent={separator}
      />
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize:18,
  },
  icon: {
    opacity: 0.3,
  },
});

export default MenuList;
