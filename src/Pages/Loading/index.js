import React, {useEffect} from 'react';
import {StatusBar, ActivityIndicator, View, StyleSheet} from 'react-native';
import Colors from '../../styles/Color';

import {isInitialized} from '../../services/Welcome';

export default function Loading({navigation}) {
  useEffect(() => {
    async function makeRedirect() {
      (await isInitialized())
        ? navigation.navigate('Main')
        : navigation.navigate('Welcome');
    }
    makeRedirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ActivityIndicator size={60} color={Colors.violet} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
