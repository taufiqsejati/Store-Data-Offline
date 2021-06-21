import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Gap, Button} from '../components';
import {getData, removeIndex, showMessage} from '../utils';

const sync = () => {
  const [list, setList] = useState([]);
  const getDaata = () => {
    getData('form').then(res => {
      setList(res);
    });
  };

  const onRemove = args => {
    removeIndex('form', args).then(() => {
      setTimeout(() => {
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
  const callApi = args => {
    // console.log(args);
    const promises = args.map(item => {
      const data = {
        title: item.title,
        body: item.body,
        userId: item.userId,
      };
      const movieUrl = 'https://jsonplaceholder.typicode.com/posts';
      return Axios.post(movieUrl, data);
    });
    Axios.all(promises)
      .then(results => {
        console.log(results);
        const title = results.map(forme => {
          // return removeIndex('form', forme.data.title);
          return forme.data.title;
        });

        title.map(item => {
          return removeIndex('form', item);
        });

        // console.log('wew :', title);
        // removeIndex('form', title);
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
        // const title = res.map(forme => {
        //   return forme.title;
        // });

        callApi(res);
      }
    });
  };
  return (
    <View style={{flex: 1, padding: 16}}>
      <View style={{flex: 1}}>
        <Text style={{fontSize: 16, fontWeight: '500'}}>Sync</Text>
        <Gap height={16} />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Button
            text="Remove"
            onPress={onCallApiAll}
            color={'grey'}
            textColor={'white'}
          />
        </View>
      </View>
    </View>
  );
};

export default sync;

const styles = StyleSheet.create({});
