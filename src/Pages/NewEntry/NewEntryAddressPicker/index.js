import React from 'react';
import {View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import Geocoder from 'react-native-geocoding';

import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../../styles/Color';

const NewEntryAddressPicker = ({address, onChange}) => {
  const getLocation = (latitude, longitude) => {
    Geocoder.init('AIzaSyAzQNH9IO-MScUjJggoJnGsTZHFGGj7g-g');

    //fazendo a geolocalização reversa
    //será realizada uma requisição no formato de promise
    Geocoder.from({latitude, longitude})
      .then(json => {
        //recuperando endereço formatado
        const formattedAddress = json.results[0].formatted_address;
        Alert.alert('Localização', formattedAddress, [
          //incluindo escolhas no alert
          //Botão cancelar
          {
            text: 'Cancelar',
            onPress: () => {},
            style: 'cancel',
          },
          //botão confirmar --> chamando função onChange
          {
            text: 'Confirmar',
            onPress: () => {
              onChange({
                latitude: latitude,
                longitude: longitude,
                address: formattedAddress,
              });
            },
          },
        ]);
      })
      .catch(error => {
        console.error(
          'NewEntryAddressPicker :: getLocation :: erro ao recuperar localização.',
          error,
        );
        Alert.alert(
          'Houve um erro ao recuperar sua posição. Certifique-se de autorizar este aplicativo. ',
        );
      });
  };

  //funcao que recuperar latitude e longitude usando a lib Geolocation

  const getPosition = () => {
    Geolocation.getCurrentPosition(
      pos => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;

        //consumindo a api do google e recebendo a localização

        getLocation(latitude, longitude);
      },
      error => {
        console.error(
          'NewEntryAddressPicker :: erro ao recuperar posição',
          error,
        );
        Alert.alert(
          'Houve um erro ao recuperar sua posição. Certifique-se de autorizar este aplicativo. ',
        );
      },
    );
  };

  const onButtonPres = () => {
    //o Address servirá para realizar a nossa edição
    if (address) {
      Alert.alert('Localização', address, [
        //Botão de apagar registros de endereço
        {
          text: 'Apagar',
          onPress: () => {
            onChange({latitude: null, longitude: null, address: ''});
          },
          style: 'cancel',
        },
        {text: 'Ok', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      getPosition();
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.button, address ? styles.buttonActived : '']}
        onPress={onButtonPres}>
        <Icon name="person-pin" size={30} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 150,
    backgroundColor: Colors.asphalt,
    width: 59,
    height: 59,
    marginHorizontal: 3,
  },
  buttonActived: {
    backgroundColor: Colors.blue,
  },
});

export default NewEntryAddressPicker;
