import React from 'react';
import {StyleSheet, Text, View, TextInput, Button, Picker} from 'react-native';

import EntryLabel from '../../components/BalanceLabel';
import EntrySummary from '../../components/EntrySummary';
import EntryList from '../../components/EntryList';

const Report = () => {
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
        <Picker>
          <Picker.Item label="Todas Categorias" />
        </Picker>
        <Picker>
          <Picker.Item label="Últimos 7 dias" />
        </Picker>
      </View>
      <EntrySummary entriesGrouped={entriesGrouped} />
      <EntryList entries={entries} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  label: {
    fontSize: 12,
  },
  value: {
    fontSize: 18,
  },
  input: {
    borderColor: '#000',
    borderWidth: 1,
  },
});

export default Report;
