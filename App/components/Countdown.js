import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';
import CircleTimer from './CircleTimer';

export default function Countdown({
  countdown,
  rounds,
  roundCountdown,
  roundsCounter,
  workoutTime,
  restTime,
  isWorkoutTime,
  cyclesCounter,
  cycles,
}) {
  const formatTime = (time) => {
    const seconds = `0${Math.floor(time % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / 60) % 60)}`.slice(-2);
    const timeString = `${minutes}:${seconds}`;
    return timeString;
  };

  return (
    <View style={styles.container}>
      <View style={styles.metaContainer}>
        <Text style={styles.metaTime}>{formatTime(countdown)}</Text>
        <Text style={styles.metaTime}>
          Cycle {cyclesCounter}/{cycles}
        </Text>
        <Text style={styles.metaTime}>
          Round {roundsCounter % rounds === 0 ? rounds : roundsCounter % rounds}
          /{rounds}
        </Text>
      </View>
      <CircleTimer
        roundCountdown={roundCountdown}
        countdown={countdown}
        rounds={rounds}
        roundsCounter={roundsCounter}
        workoutTime={workoutTime}
        restTime={restTime}
        isWorkoutTime={isWorkoutTime}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: 50,
    // marginTop: 40,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.buttonBackground.gray,
    padding: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  metaTime: {
    fontSize: 18,
    color: colors.white,
    fontWeight: 'bold',
  },
});
