import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ColorPropType,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';

import EntryLabel from '../../components/BalanceLabel';
import EntrySummary from '../../components/EntrySummary';
import EntryList from '../../components/EntryList';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Report = ({navigation}) => {
  const entriesGrouped = [
    {key: '1', description: 'Alimentação', amount: '$201'},
    {key: '2', description: 'Saude', amount: '$300'},
    {key: '3', description: 'Educação', amount: '$493'},
    {key: '4', description: 'Lazer', amount: '$1200'},
  ];

  const entries = [
    {key: '1', description: 'Padaria da Praça', amount: '$2,50'},
    {key: '2', description: 'Sorvete', amount: '$2,00'},
    {key: '3', description: 'Mensalidade da Faculdade', amount: '$493'},
    {key: '4', description: 'Gasolina', amount: '$200,00'},
  ];

  const currentBalance = '2.535,66';

  return (
    <View style={styles.container}>
      <EntryLabel currentBalance={currentBalance}> </EntryLabel>
      <View>
        <View style={styles.containerPicker}>
          <Picker style={styles.label}>
            <Picker.Item label="Todas Categorias" />
          </Picker>
          <Icon name="arrow-drop-down" size={30} />
        </View>
        <View style={styles.containerPicker}>
          <Picker style={styles.label}>
            <Picker.Item label="Últimos 7 dias" />
          </Picker>
          <Icon name="arrow-drop-down" size={30} />
        </View>
      </View>
      <EntrySummary entriesGrouped={entriesGrouped} />
      <EntryList entries={entries} />
      <Button title="Excluir" onPress={() => navigation.goBack()} />
      <Button title="Cancelar" onPress={() => navigation.navigate('Main')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    padding: 10,
  },
  containerPicker: {
    flexDirection: 'row',
    borderColor: '#000',
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  label: {
    fontSize: 12,
    color: '#000',
    flex: 1,
  },
  value: {
    fontSize: 18,
  },
  input: {
    borderColor: '#000',
    borderWidth: 1,
    color: '#000',
  },
});

export default Report;
