import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {PieChart} from 'react-native-svg-charts';

const EntrySummaryChart = ({data}) => {
  // const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

  const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
      0,
      7,
    );

  // const chartData = data
  //   .filter(value => value > 0)
  //   .map((value, index) => ({
  //     value,
  //     svg: {
  //       fill: randomColor(),
  //       onPress: () => console.log('press', index),
  //     },
  //     key: `pie-${index}`,
  //   }));

  const chartData = data.map(({category, amount}) => ({
    key: category.id,
    value: amount,
    svg: {
      fill: category.color,
    },
    arc: {
      outerRadius: '100%',
      innerRadius: '80%',
    },
  }));

  return (
    <View style={styles.container}>
      <PieChart style={styles.chart} data={chartData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  chart: {
    height: 100,
    width: 100,
    marginRight: 10,
  },
});

export default EntrySummaryChart;
