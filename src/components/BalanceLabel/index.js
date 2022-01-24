import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Currency from '../Core/Currency';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../styles/Color';

import useBalance from '../../hooks/useBalance';

const BalanceLabel = () => {
  const [currentBalance] = useBalance();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Saldo Atual</Text>
      <LinearGradient
        style={styles.panel}
        colors={[Colors.violet, Colors.blue]}>
        <Text style={styles.value}>
          <Currency value={currentBalance} />
        </Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 12,
    color: Colors.white,
  },
  value: {
    fontSize: 28,
    color: Colors.white,
    textAlign: 'center',
  },
  panel: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginVertical: 10,
    minWidth: 180,
  },
});

export default BalanceLabel;
