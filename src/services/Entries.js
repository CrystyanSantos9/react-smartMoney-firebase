import {getRealm} from './Realm';
import {Alert} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import moment from '../vendors/moment';

export const getEntries = async (days, category) => {
  let realm = await getRealm();

  realm = realm.objects('Entry');

  if (days > 0) {
    const date = moment().subtract(days, 'days').toDate();
    realm = realm.filtered('entryAt >=$0', date);
  }

  if (category && category.id) {
    console.log('getEntries :: category', JSON.stringify(category));
    realm = realm.filtered('category == $0', category);
  }

  const entries = realm.sorted('entryAt', true);

  console.log('getEntries :: entries ', entries);
  return entries;
};

export const addEntry = async entry => {
  let data = {};

  try {
    data = {
      amount: entry.amount,
      description: entry.category.name,
      entryAt: entry.entryAt || new Date(),
      latitude: entry.latitude,
      longitude: entry.longitude,
      address: entry.address,
      photo: entry.photo,
      isInit: entry.isInit || false,
      category: entry.category,
    };

    firestore().settings({
      ignoreUndefinedProperties: true,
    });
    await firestore().collection('entries').add(data);

    console.log('addEntry :: data: ', JSON.stringify(data));
  } catch (error) {
    console.error(
      'addEntry :: error on save object: ',
      JSON.stringify(data),
      JSON.stringify(error),
    );
    Alert.alert('Error', 'Houve um erro ao salvar este lançamento.');
  }

  return data;
};

export const deleteEntry = async entry => {
  const realm = await getRealm();

  try {
    realm.write(() => {
      realm.delete(entry);
    });
  } catch (error) {
    console.error(
      'deleteEntry :: error on remove object: ',
      JSON.stringify(entry),
    );
    Alert.alert('Erro ao tentar remover os deste lançamento.');
  }
};
