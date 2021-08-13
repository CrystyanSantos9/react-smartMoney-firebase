/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import BalancePanel from '../../components/BalancePanel';
import EntryList from '../../components/EntryList';
import EntrySummary from '../../components/EntrySummary';

import Colors from '../../styles/Color';

const Main = ({navigation}) => {

  return (
    <View style={styles.container}>
      <BalancePanel  onNewEntryPress={() => navigation.navigate('NewEntry')}/>
      <EntrySummary onPressActionButton={()=> navigation.navigate('Report')}/>
      <EntryList
      onEntryPress={(entry) =>
        navigation.navigate('NewEntry', {
          entry: entry,
        })
      }
      onPressActionButton={()=> navigation.navigate('Report')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    backgroundColor: Colors.background,
  },
  label: {
    fontSize: 20,
  },
});

export default Main;
