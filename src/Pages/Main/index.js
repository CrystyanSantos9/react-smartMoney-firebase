import React, {useEffect} from 'react';
import {LogBox} from 'react-native';

import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import BalancePanel from '../../components/BalancePanel';
import EntryList from '../../components/EntryList';
import EntrySummary from '../../components/EntrySummary';

import Colors from '../../styles/Color';

const Main = ({navigation}) => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <View style={styles.container}>
      <BalancePanel onNewEntryPress={() => navigation.navigate('NewEntry')} />
      <ScrollView>
        <EntrySummary
          onPressActionButton={() => navigation.navigate('Report')}
        />
        <EntryList
          onEntryPress={entry =>
            navigation.navigate('NewEntry', {
              entry: entry,
            })
          }
          onPressActionButton={() => navigation.navigate('Report')}
        />
      </ScrollView>
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
