import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function Countdown({
  countdown,
  rounds,
  roundCountdown,
  roundsCounter,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.metaContainer}>
        <Text style={styles.metaTime}>{countdown}</Text>
        <Text style={styles.metaTime}>
          Round {roundsCounter} of {rounds}
        </Text>
      </View>
      <Text style={styles.roundCountdown}>{roundCountdown}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 50,
    marginTop: 40,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaTime: {
    fontSize: 18,
    color: colors.white,
    fontWeight: 'bold',
  },
  roundCountdown: {
    alignSelf: 'center',
    fontSize: 100,
    marginTop: 20,
    color: colors.white,
  },
});
