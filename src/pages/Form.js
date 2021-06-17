import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Gap, TextInput, Button} from '../components';
import {getData, showMessage, storeData, useForm} from '../utils';

const Form = ({params}) => {
  const [form, setForm] = useForm({
    title: 'Bukalapak',
    body: 'Emang cincayy tidak mahal tidak lebayy',
    userId: 1,
  });
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const onSubmit = () => {
    console.log('isi data sebelum AsyncStorage :', form);
    storeData('form', form).then(() => {
      getDataForm();
    });
  };
  const getDataForm = () => {
    getData('form').then(res => {
      console.log('isi data setelah AsyncStorage :', res);
      setTitle(res.title);
      setBody(res.body);
      showMessage('success menyimpan', 'success');
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1, paddingHorizontal: 24, paddingVertical: 24}}>
        <Text>Store Data Offline</Text>
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
        />
        <Gap height={16} />
        <Button
          text="Submit"
          onPress={onSubmit}
          color={'red'}
          textColor={'white'}
        />
        <Gap height={16} />
        <View style={{flex: 1}}>
          <Text>Title : {title}</Text>
          <Gap height={5} />
          <Text>Body : {body}</Text>
        </View>
      </View>
    </View>
  );
};

export default Form;
