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
  const INIT_CYCLES = 3;

  const [workoutTime, setWorkoutTime] = useState(INIT_WORKOUT_TIME);
  const [restTime, setRestTime] = useState(INIT_REST_TIME);
  const [rounds, setRounds] = useState(INIT_ROUNDS);
  const [cycles, setCycles] = useState(INIT_CYCLES);

  const [countdown, setCountdown] = useState(
    (INIT_WORKOUT_TIME + INIT_REST_TIME) * INIT_ROUNDS * INIT_CYCLES
  );
  const [roundCountdown, setRoundCountdown] = useState(INIT_WORKOUT_TIME);
  const [roundsCounter, setRoundsCounter] = useState(1);
  const [cyclesCounter, setCyclesCounter] = useState(1);
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
        if (isWorkoutTime) {
          setIsWorkoutTime(!isWorkoutTime);
          setRoundCountdown(restTime - 1);
        } else {
          setIsWorkoutTime(!isWorkoutTime);
          setRoundCountdown(workoutTime - 1);

          setRoundsCounter(roundsCounter + 1);
          if (roundsCounter % rounds === 0) {
            setCyclesCounter(cyclesCounter + 1);
          }
        }
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [
    countdown,
    isCountingDown,
    roundCountdown,
    roundsCounter,
    isWorkoutTime,
    workoutTime,
    restTime,
    rounds,
    cyclesCounter,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <Countdown
        countdown={countdown}
        rounds={rounds}
        roundCountdown={roundCountdown}
        roundsCounter={roundsCounter}
        workoutTime={workoutTime}
        restTime={restTime}
        isWorkoutTime={isWorkoutTime}
        cycles={cycles}
        cyclesCounter={cyclesCounter}
      />

      <View style={styles.buttonsContainer}>
        {/* {!isCountingDown && countdown !== (workoutTime + restTime) * rounds && ( */}
        <CountdownButton
          text="Cancel"
          color={colors.white}
          backgroundColor={colors.buttonBackground.gray}
          disabled={
            countdown !== (workoutTime + restTime) * rounds * cycles
              ? false
              : true
          }
          onPress={() => {
            setCountdown((workoutTime + restTime) * rounds * cycles);
            setRoundCountdown(workoutTime);
            setRoundsCounter(1);
            setIsCountingDown(false);
            setIsWorkoutTime(true);
            setCyclesCounter(1);
          }}
        />
        {/* )} */}
        {!isCountingDown &&
          countdown === (workoutTime + restTime) * rounds * cycles && (
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
        {!isCountingDown &&
          countdown !== (workoutTime + restTime) * rounds * cycles && (
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
