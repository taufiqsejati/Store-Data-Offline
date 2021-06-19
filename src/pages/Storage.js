import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {Gap, ListEmpty} from '../components';
import {getData, removeIndex, showMessage, storeData2} from '../utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Axios from 'axios';

const Storage = ({params}) => {
  const [list, setList] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const getDaata = () => {
    getData('form').then(res => {
      setList(res);
      setIsRefreshing(false);
    });
  };
  const handleRefresh = () => {
    setIsRefreshing(true);
    getDaata();
  };
  useEffect(() => {
    getDaata();
  }, []);
  const onRemove = args => {
    removeIndex('form', args).then(() => {
      setTimeout(() => {
        setIsRefreshing(true);
        getDaata();
      }, 2000);
    });
  };
  const onSubmit = form => {
    getData('form').then(res => {
      if (res) {
        const title = res.map(forme => {
          return forme.title;
        });
        if (title.includes(form.title)) {
          showMessage('Data gagal terkirim');
        }
      }
    });
  };
  const callApi = form => {
    const data = {
      title: form.title,
      body: form.body,
      userId: form.userId,
    };
    Axios.post('https://jsonplaceholder.typicode.com/posts', data)
      .then(response => {
        console.log(response.data);
        showMessage('Data berhasil terkirim', 'success');
        onRemove(form.title);
      })
      .catch(error => {
        if (error.response) {
          onSubmit(form);
        } else if (error.request) {
          onSubmit(form);
        } else {
        }
      });
  };
  return (
    <View style={{flex: 1, padding: 16}}>
      <Text style={{fontSize: 16, fontWeight: '500'}}>Storage Offline</Text>
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
                marginTop: 16,
                overflow: 'hidden',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: '87%',
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
                <View
                  style={{
                    width: '13%',
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={callApi.bind(this, item)}
                    activeOpacity={0.7}
                    style={{
                      height: '50%',
                      width: '100%',
                      paddingVertical: 15,
                      backgroundColor: 'gray',
                    }}>
                    <FontAwesome
                      name={'send'}
                      size={14}
                      color={'white'}
                      style={{alignSelf: 'center'}}
                    />
                    {/* <Text style={{textAlign: 'center'}}>S</Text> */}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={onRemove.bind(this, item.title)}
                    activeOpacity={0.7}
                    style={{
                      height: '50%',
                      width: '100%',
                      paddingVertical: 15,
                      backgroundColor: 'gray',
                    }}>
                    <FontAwesome
                      name={'remove'}
                      size={16}
                      color={'white'}
                      style={{alignSelf: 'center'}}
                    />
                    {/* <Text style={{textAlign: 'center'}}>R</Text> */}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Storage;
