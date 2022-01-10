import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import BalanceLabel from '../../components/BalanceLabel';
import NewEntryInput from './NewEntryInput';
import NewEntryCategoryPicker from './NewEntryCategoryPicker';
import NewEntryDatePicker from './NewEntryDatePicker';
import NewEntryDeleteAction from './NewEntryDeleteAction';
import NewEntryAddressPicker from './NewEntryAddressPicker';
import NewEntryCameraPicker from './NewEntryCameraPicker';

import ActionFooter, {
  ActionPrimaryButton,
  ActionSecondaryButton,
} from '../../components/Core/ActionFooter';

import useEntries from '../../hooks/useEntries';

import Colors from '../../styles/Color';

const NewEntry = ({navigation}) => {
  const entry = navigation.getParam('entry', {
    id: null,
    amount: '0.00',
    latitude: null,
    longitude: null,
    address: null,
    category: {id: null, name: 'Selecione'},
    entryAt: new Date(),
    photo: null,
  });

  const [, saveEntry, deleteEntry] = useEntries();

  const [debit, setDebit] = useState(entry.amount <= 0);
  const [amount, setAmount] = useState(`${entry.amount}`);
  const [category, setCategory] = useState(entry.category);
  const [entryAt, setEntryAt] = useState(entry.entryAt);
  const [address, setAddress] = useState(entry.address);
  const [photo, setPhoto] = useState(entry.photo);
  const [latitude, setLatitude] = useState(entry.latitude);
  const [longitude, setLongitude] = useState(entry.longitude);

  const isValid = () => {
    if (parseFloat(amount) !== 0 && category.name !== 'Selecione') {
      return true;
    }
    return false;
  };

  const onSave = () => {
    const data = {
      amount: parseFloat(amount),
      address: address,
      latitude: latitude,
      longitude: longitude,
      category: category,
      entryAt: entryAt,
      photo: photo,
    };

    console.log('NewEntry :: save ', data);
    saveEntry(data, entry);
    onClose();
  };

  const onRemove = () => {
    deleteEntry(entry);
    onClose();
  };

  const onClose = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <BalanceLabel />
      {/* New Entry Form - Primeiro design */}
      <View style={styles.formContainer}>
        <NewEntryInput
          value={amount}
          onChangeDebit={setDebit}
          onChangeValue={setAmount}
        />
        <NewEntryCategoryPicker
          debit={debit}
          category={category}
          onChangeCategory={setCategory}
        />

        <View style={styles.formActionContainer}>
          <NewEntryDatePicker value={entryAt} onChange={setEntryAt} />
          <NewEntryCameraPicker photo={photo} onChangePhoto={setPhoto} />
          <NewEntryAddressPicker
            address={address}
            onChange={({latitude, longitude, address}) => {
              setLatitude(latitude);
              setLongitude(longitude);
              setAddress(address);
            }}
          />
          <NewEntryDeleteAction entry={entry} onOkPress={onRemove} />
        </View>
      </View>

      <ActionFooter>
        <ActionPrimaryButton
          title={entry.id ? 'Salvar' : 'Adicionar'}
          onPress={() => {
            isValid() && onSave();
          }}
        />
        <ActionSecondaryButton title="Cancelar" onPress={onClose} />
      </ActionFooter>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.background,
  },
  formContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  formActionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
});

export default NewEntry;
