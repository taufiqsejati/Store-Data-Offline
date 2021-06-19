import React from 'react';
import {Text, View} from 'react-native';
import {Button, Gap, TextInput} from '../components';
import {
  getData,
  removeIndex,
  removeValue,
  showMessage,
  storeData2,
  useForm,
} from '../utils';
import Axios from 'axios';

const Form = ({params}) => {
  const [form, setForm] = useForm({
    title: 'Bukalapak',
    body: 'Emang cincayyy tidak lebay tidak maksa',
    userId: 1,
  });
  const onSubmit = () => {
    getData('form').then(res => {
      if (res) {
        const title = res.map(forme => {
          return forme.title;
        });
        if (title.includes(form.title)) {
          showMessage('Data sudah pernah ada');
        } else {
          // call api
          callApi();
        }
      } else {
        // call api
        callApi();
      }
    });
  };
  const onGetAllData = () => {
    getData('form').then(res => {
      console.log(res);
    });
  };
  const onRemoveAll = () => {
    removeValue('form');
  };
  const onRemove = () => {
    removeIndex('form', form.title);
  };

  const callApi = () => {
    const data = {
      title: form.title,
      body: form.body,
      userId: 1,
    };
    Axios.post('https://jsonplaceholder.typicode.com/posts', data)
      .then(response => {
        console.log(response.data);
        showMessage('Data berhasil terkirim', 'success');
      })
      .catch(error => {
        if (error.response) {
          showMessage('Gagal terkirim, Data masuk ke local storage');
          storeData2('form', form);
        } else if (error.request) {
          showMessage('Gagal terkirim, Data masuk ke local storage');
          storeData2('form', form);
        } else {
        }
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white', padding: 16}}>
      <View style={{flex: 1}}>
        <Text style={{fontSize: 16, fontWeight: '500'}}>Formulir</Text>
        <Gap height={16} />
        <TextInput
          label="Title"
          placeholder="Type your title"
          value={form.title}
          onChangeText={value => setForm('title', value)}
        />
        <Gap height={16} />
        <TextInput
          label="Body"
          placeholder="Type your body"
          value={form.body}
          onChangeText={value => setForm('body', value)}
          multiline
        />
        <Gap height={16} />
        <Button
          text="Submit"
          onPress={onSubmit}
          color={'red'}
          textColor={'white'}
        />
        <Gap height={16} />
        <Button
          text="Remove"
          onPress={onRemove}
          color={'grey'}
          textColor={'white'}
        />
        <Gap height={16} />
        <Button
          text="Remove All"
          onPress={onRemoveAll}
          color={'blue'}
          textColor={'white'}
        />
        <Gap height={16} />
        <Button
          text="Get All Data"
          onPress={onGetAllData}
          color={'green'}
          textColor={'white'}
        />
      </View>
    </View>
  );
};

export default Form;
