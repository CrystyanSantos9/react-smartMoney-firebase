import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import Categorymodal from '../../../components/CategoryModal';

import Colors from '../../../styles/Color';

export const NewEntryCategoryPicker = ({debit, category, onChangeCategory}) => {
  const [modaVisible, setModalVisible] = useState(false);

  const onCategoryPress = item => {
    onChangeCategory(item);
    onClosePress();
  };

  const onClosePress = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.pickerButtonText}>{category.name}</Text>
      </TouchableOpacity>
      <Categorymodal
        categoryType={debit ? 'debit' : 'credit'}
        isVisible={modaVisible}
        onConfirm={onCategoryPress}
        onCancel={onClosePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  pickerButton: {
    backgroundColor: Colors.asphalt,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 20,
  },
  pickerButtonText: {
    fontSize: 28,
    color: Colors.white,
    textAlign: 'center',
  },
  modalItem: {
    backgroundColor: Colors.asphalt,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 20,
  },
  modalItemText: {
    fontSize: 22,
    color: Colors.white,
    textAlign: 'center',
  },
  closeButton: {
    alignSelf: 'center',
    backgroundColor: Colors.background,
    borderColor: Colors.green,
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
  closeButtonText: {
    fontSize: 14,
    color: Colors.green,
    textAlign: 'center',
  },
});

export default NewEntryCategoryPicker;
