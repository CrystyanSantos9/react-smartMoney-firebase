/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import BalancePanel from '../../components/BalancePanel';
import EntryList from '../../components/EntryList';
import EntrySummary from '../../components/EntrySummary';

const Main = ({navigation}) => {

  const  entriesGrouped = [
    {key:  '1',  description: 'Alimentação', amount: '$201'},
    {key:  '2',  description:'Saude', amount: '$300'},
    {key:  '3',  description:'Educação', amount: '$493'},
    {key:  '4',  description:'Lazer', amount: '$1200'}
  ];

  const currentBalance = '2.088,35';

  return (
    <View style={styles.container}>
      <BalancePanel currentBalance={currentBalance} />
      <Button title="Adicionar" onPress={()=> navigation.navigate('NewEntry') }/>
      {/* <Button title="Adicionar" onPress={save}/>  */}
      <EntrySummary entriesGrouped={entriesGrouped} />
      <EntryList navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 20,
  },
});

export default Main;
