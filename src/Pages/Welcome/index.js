import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';

import ActionFooter, {
  ActionPrimaryButton,
} from '../../components/Core/ActionFooter';

import useCategories from '../../hooks/useCategories';
import {addEntry} from '../../services/Entries';

import Colors from '../../styles/Color';
import Logo from '../../assets/logo-white.png';
import WelcomeMessage from './WelcomeMessage';
import WelcomeBalanceInput from './WelcomeBalanceInput';

import {setInitialized} from '../../services/Welcome';

export default function Welcome({navigation}) {
  const [amount, setAmount] = useState(0);
  const [, , , initCategories] = useCategories();

  const onSavePress = async () => {
    addEntry({
      amount: parseFloat(amount),
      isInit: true,
      category: initCategories,
    });

    setInitialized();
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={Logo} />
      </View>
      <WelcomeMessage />
      <WelcomeBalanceInput value={amount} onChangeValue={setAmount} />
      <ActionFooter>
        <ActionPrimaryButton title="Continuar" onPress={onSavePress} />
      </ActionFooter>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 10,
  },
  logo: {
    alignItems: 'center',
    marginTop: 20,
  },
});
