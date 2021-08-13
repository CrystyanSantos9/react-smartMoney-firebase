/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

import Svg, {Circle, Rect} from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../../styles/Color';

//  y = altura 0 = topo / altura 50 = base

const EntryListItem = ({entry, isFirstItem, isLastItem, onEntryPress }) => {

  const bulletLineY = isFirstItem ? 25 : 0;
  const bulletLineHeight = isLastItem ? 25 : 50;
  const showBulletLine = !(isFirstItem && isLastItem);
  const bulletColor =  entry.category.color || Colors.white;

  return (
    <TouchableOpacity onPress={()=>{
      onEntryPress &&  onEntryPress(entry);
    }}>
    <View style={styles.container}>
      {/* View com SVG */}
    <View style={styles.bullet}>
      <Svg height="50" width="30">
       {showBulletLine && (
          <Rect
          x="9"
          y={bulletLineY}
          width="1.5"
          height={bulletLineHeight}
          fill={Colors.background}
           />
       )}
       <Circle
        cx="10"
        cy="25"
        r={8}
        stroke={Colors.background}
        strokeWidth="1.5"
        fill={bulletColor}
       />
      </Svg>
      </View>
{/* View descrição e ícones */}
      <View  style={styles.description}>
        <Text style={styles.descriptionText}>{entry.description}</Text>
        <View  style={styles.details}>
          <Icon style={styles.entryAtIcon} name="access-time" size={15} />
          <Text style={styles.entryAtText}>{entry.entryAt.toString()}</Text>
          {entry.address && (
            <>
            <Icon style={styles.addressIcon}name="person-pin" size={15}/>
            <Text  style={styles.addressText}>{entry.address}</Text>
            </>
            )
          }

        </View>
      </View>
 {/* View Valores */}
      <View style={styles.amount}>
      <Text style={styles.amountText}>{entry.amount}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  bullet: {
    // backgroundColor: Colors.yellow,
  },
  description: {
    flex: 1,
    // backgroundColor: Colors.blue,
  },
  descriptionText: {
    fontSize: 14,
    color: Colors.white,
    justifyContent: 'center',
  },
  details: {
  flexDirection: 'row',
  },
  entryAtIcon:{
    color: Colors.metal,
    marginTop: 2,
    marginRight: 2,
  },
  entryAtText:{
  color: Colors.metal,
  fontSize: 12,
},
addressIcon:{
  color: Colors.metal,
  marginTop: 2,
  marginRight: 2,
  marginLeft: 5,
},
addressText:{
  color: Colors.metal,
  fontSize: 12,
},
  amount: {
    // backgroundColor: Colors.green,
    justifyContent: 'center',
  },
  amountText:{
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.white,
  },
});

export default EntryListItem;
