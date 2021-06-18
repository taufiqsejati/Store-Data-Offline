import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from '../showMessage';

// inti
export const storeData = async (storageKey, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storageKey, jsonValue);
    showMessage('Berhasil menyimpan di localstorage', 'success');
  } catch (e) {
    showMessage('Gagal menyimpan di localstorage');
  }
};
export const removeValue = async storageKey => {
  try {
    await AsyncStorage.removeItem(storageKey);
    showMessage('Berhasil menghapus semua', 'success');
  } catch (e) {
    showMessage('Gagal menghapus semua');
  }
};
export const getData = async storageKey => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    showMessage('Gagal mengambil di localstorage');
  }
};

// custom
export const removeIndex = async (storageKey, value) => {
  try {
    getData(storageKey).then(res => {
      const jsonValue = res;
      if (jsonValue !== null) {
        function getIndex(title) {
          return jsonValue.findIndex(obj => obj.title === title);
        }
        const arg = getIndex(value);
        if (arg > -1) {
          jsonValue.splice(arg, 1);
          storeData(storageKey, jsonValue).then(() => {
            showMessage(`Berhasil remove item ${arg} `, 'success');
            getData(storageKey).then(res => {
              console.log(res);
            });
          });
        }
      }
    });
  } catch (error) {
    showMessage(`Gagal remove index ${value}`);
    console.log(error);
  }
};

export const storeData2 = (storageKey, value) => {
  try {
    // console.log('data1', storageKey);
    let inputKeyArray = [];
    let dataToBeStored = value;
    // console.log('part1', dataToBeStored);
    AsyncStorage.getItem(storageKey, (err, resp) => {
      let responseData = JSON.parse(resp);
      // console.log('part2', responseData);
      inputKeyArray = responseData || [];
      inputKeyArray.push(dataToBeStored);
      // console.log('part3', inputKeyArray);
      AsyncStorage.setItem(storageKey, JSON.stringify(inputKeyArray)).then(
        () => {
          getData(storageKey).then(res => {
            console.log(res);
            showMessage('Berhasil menyimpan di localstorage', 'success');
          });
        },
      );
    });
  } catch (error) {
    showMessage('Gagal menyimpan di localstorage');
  }
};
