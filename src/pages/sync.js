import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {Button, Gap, ListEmpty} from '../components';
import {getData, removeValue, showMessage} from '../utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const sync = () => {
  const [list, setlist] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const getDaata = () => {
    Axios.get(
      'https://crudcrud.com/api/d9e2763c0f6c4e48a3aa4027fd2a04d1/unicorns/',
    )
      .then(res => {
        console.log('pendekatan :', res.data);
        setlist(res.data);
        setIsRefreshing(false);
        setError(false);
      })
      .catch(error => {
        if (error.response) {
          setError(true);
          showMessage(error.toString());
        } else if (error.request) {
          setError(true);
          showMessage(error.toString());
        } else {
        }
      });
  };
  useEffect(() => {
    getDaata();
  }, []);
  const handleRefresh = () => {
    setIsRefreshing(true);
    getDaata();
  };
  const onRemove = () => {
    removeValue('form');
  };
  const callApi = args => {
    const promises = args.map(item => {
      const data = {
        title: item.title,
        body: item.body,
        // userId: item.userId,
      };
      const movieUrl =
        'https://crudcrud.com/api/d9e2763c0f6c4e48a3aa4027fd2a04d1/unicorns';
      // const movieUrl = 'https://jsonplaceholder.typicode.com/posts';
      return Axios.post(movieUrl, data);
    });
    Axios.all(promises)
      .then(res => {
        const data = res.map(item => {
          return item.data;
        });
        console.log('Yang di upload :', data);
        onRemove();
      })
      .catch(error => {
        if (error.response) {
          showMessage('Error');
        } else if (error.request) {
          showMessage('Error');
        } else {
        }
      });
  };

  const onCallApiAll = () => {
    getData('form').then(res => {
      if (res) {
        callApi(res);
      }
    });
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
      }}>
      <Text style={{fontSize: 16, fontWeight: '500', marginBottom: 16}}>
        Storage Online
      </Text>
      {error ? (
        <ListEmpty type={1} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={list}
          keyExtractor={(item, index) => index}
          ListEmptyComponent={<ListEmpty type={1} />}
          refreshControl={
            <RefreshControl
              colors={['#9Bd35A', '#689F38']}
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
          renderItem={({item}) => {
            return (
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  borderRadius: 8,
                  shadowColor: 'black',
                  shadowOffset: {width: 0, height: 7},
                  shadowOpacity: 0.5,
                  shadowRadius: 10,
                  marginBottom: 16,
                  overflow: 'hidden',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: 'white',
                      padding: 15,
                      alignSelf: 'center',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: '20%'}}>
                        <Text style={{fontSize: 14, fontWeight: '500'}}>
                          Title :
                        </Text>
                      </View>
                      <View style={{width: '80%'}}>
                        <Text>{item.title}</Text>
                      </View>
                    </View>

                    <Gap height={10} />

                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: '20%'}}>
                        <Text style={{fontSize: 14, fontWeight: '500'}}>
                          Body :
                        </Text>
                      </View>
                      <View style={{width: '80%'}}>
                        <Text>{item.body}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default sync;

const styles = StyleSheet.create({});
