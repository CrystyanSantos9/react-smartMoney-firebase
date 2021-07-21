import React from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import BalanceLabel from '../../components/BalanceLabel';

const NewEntry = ({navigation}) => {
const currentBalance = '2.535,66';
  return (
    <View style={styles.container}>
     <BalanceLabel currentBalance={currentBalance} />

{/* New Entry Form - Primeiro design */}
     <View>
        <TextInput style={styles.input} />
        <TextInput style={styles.input} />
          <Button title="GPS" />
          <Button title="Câmera" />
      </View>

      <View>
          <Button title="Adicionar" />
          <Button title="Cancelar" onPress={()=> navigation.goBack() }/>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff"
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
  }
});

export default NewEntry;
