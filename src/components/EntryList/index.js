import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Button} from 'react-native';

// import EntryListItem from './EntryListItem';
import Container from '../Core/Container';
import EntryListItem from './EntryListItem';

import useEntries from '../../hooks/useEntries';

const EntryList = ({days = 7, category, onEntryPress, onPressActionButton}) => {
  //use entries só precisa da variável de consulta que é entries
  const [entries] = useEntries(days, category);

  return (
    <Container
      style={styles.container}
      title="Categorias"
      actionLabelText={`Últimos ${days} dias`}
      actionButtonText="Ver mais"
      onPressActionButton={onPressActionButton}>
      <FlatList
        data={entries}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <EntryListItem
            entry={item}
            isFirstItem={index === 0}
            isLastItem={index === entries.length - 1}
            onEntryPress={onEntryPress}
          />
        )}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EntryList;
