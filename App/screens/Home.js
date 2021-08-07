import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Countdown from '../components/Countdown';
import CountdownButton from '../components/CountdownButton';
import colors from '../constants/colors';

export default function Home() {
  const INIT_WORKOUT_TIME = 5;
  const INIT_REST_TIME = 5;
  const INIT_ROUNDS = 3;

  const [workoutTime, setWorkoutTime] = useState(INIT_WORKOUT_TIME);
  const [restTime, setRestTime] = useState(INIT_REST_TIME);
  const [rounds, setRounds] = useState(INIT_ROUNDS);

  const [countdown, setCountdown] = useState(
    (INIT_WORKOUT_TIME + INIT_REST_TIME) * INIT_ROUNDS
  );
  const [roundCountdown, setRoundCountdown] = useState(INIT_WORKOUT_TIME);
  const [roundsCounter, setRoundsCounter] = useState(1);
  const [isWorkoutTime, setIsWorkoutTime] = useState(true);
  const [isCountingDown, setIsCountingDown] = useState(false);

  useEffect(() => {
    if (!countdown) {
      return;
    }
    if (!isCountingDown) {
      return;
    }

    const intervalId = setInterval(() => {
      setCountdown(countdown - 1);
      setRoundCountdown(roundCountdown - 1);

      if (roundCountdown === 0) {
        if (roundsCounter > rounds) {
          setRoundsCounter(roundsCounter + 1);
        }
        if (isWorkoutTime) {
          setIsWorkoutTime(!isWorkoutTime);
          setRoundCountdown(restTime - 1);
        } else {
          setIsWorkoutTime(!isWorkoutTime);
          setRoundCountdown(workoutTime - 1);
        }
      }
    }, 1000);
    return () => clearInterval(intervalId);
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <Countdown
        countdown={countdown}
        rounds={rounds}
        roundCountdown={roundCountdown}
        roundsCounter={roundsCounter}
      />

      <View style={styles.buttonsContainer}>
        {/* {!isCountingDown && countdown !== (workoutTime + restTime) * rounds && ( */}
        <CountdownButton
          text="Cancel"
          color={colors.white}
          backgroundColor={colors.buttonBackground.gray}
          disabled={
            countdown !== (workoutTime + restTime) * rounds ? false : true
          }
          onPress={() => {
            setCountdown((workoutTime + restTime) * rounds);
            setRoundCountdown(workoutTime);
            setRoundsCounter(1);
            setIsCountingDown(false);
            console.log('pressed');
          }}
        />
        {/* )} */}
        {!isCountingDown && countdown === (workoutTime + restTime) * rounds && (
          <CountdownButton
            text="Start"
            color={colors.text.green}
            backgroundColor={colors.buttonBackground.green}
            onPress={() => {
              setIsCountingDown(true);
            }}
          />
        )}
        {isCountingDown && (
          <CountdownButton
            text="Pause"
            color={colors.text.yellow}
            backgroundColor={colors.buttonBackground.yellow}
            onPress={() => {
              setIsCountingDown(false);
            }}
          />
        )}
        {!isCountingDown && countdown !== (workoutTime + restTime) * rounds && (
          <CountdownButton
            text="Resume"
            color={colors.text.green}
            backgroundColor={colors.buttonBackground.green}
            onPress={() => {
              setIsCountingDown(true);
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
});
