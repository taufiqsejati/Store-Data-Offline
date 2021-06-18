import React from 'react';
import {Text, View} from 'react-native';
import {Button, Gap, TextInput} from '../components';
import {getData, removeIndex, removeValue, storeData2, useForm} from '../utils';

const Form = ({params}) => {
  const [form, setForm] = useForm({
    title: 'Bukalapak',
    body: 'Emang cincayy tidak mahal tidak lebayy',
    userId: 1,
  });
  const onSubmit = () => {
    storeData2('form', form);
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
  const getDataForm = () => {
    console.log('isian form :', form);
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
