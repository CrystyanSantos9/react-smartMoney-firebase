import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Currency from '../../Core/Currency';

import Colors from '../../../styles/Color';

const BalancePanelLabel = ({currentBalance}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Saldo atual</Text>
      <Text style={styles.value}>
        <Currency value={currentBalance} />
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: Colors.white,
  },
  value: {
    fontSize: 36,
    color: Colors.white,
  },
});

export default BalancePanelLabel;
