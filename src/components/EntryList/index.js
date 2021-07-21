import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import EntryListItem from './EntryListItem';

const EntryList = ({entries}) => {
  return (
    <View style={styles.container}>
      <EntryListItem entries={entries}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EntryList;
