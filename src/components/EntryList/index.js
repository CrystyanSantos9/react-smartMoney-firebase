import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Button} from 'react-native';

// import EntryListItem from './EntryListItem';

import {getEntries} from '../../services/Entries';

const EntryList = ({navigation}) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function loadEntries() {
      const data = await getEntries();
      setEntries(data);
    }

    loadEntries();

    console.log('EntryList :: useEffect');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Últimos lançamentos </Text>
      <FlatList
        data={entries}
        renderItem={({item}) => (
          <View>
            <Text>
              - {item.description} : {item.amount}
            </Text>
            <Button
              title={item.id}
              onPress={() => {
                navigation.navigate('NewEntry', {entry: item});
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default EntryList;
