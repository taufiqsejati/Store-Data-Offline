import React, {useEffect, useState} from 'react';
import {Text, View, FlatList} from 'react-native';
import {getData} from '../utils';

const Storage = ({params}) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    getData('form').then(res => {
      console.log(res);
      setList(res);
    });
  }, []);
  return (
    <View>
      <Text>Storage</Text>
      <FlatList
        data={list}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => {
          return (
            <View>
              <Text>{item.title}</Text>
              <Text>{item.body}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Storage;
