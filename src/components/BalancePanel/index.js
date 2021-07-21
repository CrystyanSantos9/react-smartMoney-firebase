import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import BalancePanelLabel from './BalancePanelLabel';
import BalancePanelChart from './BalancePanelChart';

const BalancePanel = ({navigation, currentBalance}) => {

  return (
    <View style={styles.container}>
         <BalancePanelLabel currentBalance={currentBalance} />
        <BalancePanelChart />
        {/* <Button title="Adicionar"></Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default BalancePanel;
