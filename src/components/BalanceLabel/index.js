import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../styles/Color';

const BalanceLabel = () => {
  const currentBalance = '2.535,66';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Saldo Atual</Text>
      <LinearGradient
        style={styles.panel}
        colors={[Colors.violet, Colors.blue]}>
        <Text style={styles.value}>{currentBalance}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: Colors.white,
  },
  value: {
    fontSize: 28,
    color: Colors.white,
  },
  panel: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginVertical: 10,
  },
});

export default BalanceLabel;
