import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, G, Path, Text } from 'react-native-svg';
import colors from '../constants/colors';

export default function CircleTimer({
  roundCountdown,
  workoutTime,
  restTime,
  isWorkoutTime,
}) {
  let circleColor = isWorkoutTime
    ? colors.buttonBackground.green
    : colors.buttonBackground.red;
  let textColor = isWorkoutTime ? colors.text.green : colors.text.red;

  const animateCircle = () => {
    let full = null;
    if (isWorkoutTime) {
      full = workoutTime;
    } else {
      full = restTime;
    }
    const rawFraction = roundCountdown / full;
    const gradualFraction = rawFraction - (1 / full) * (1 - rawFraction);
    const fraction = (gradualFraction * 283).toFixed(0);
    return fraction;
  };

  return (
    <View style={styles.container}>
      <View style={styles.circleTimer}>
        <Svg height="100%" width="100%" viewBox="0 0 100 100">
          <G
            fill="none"
            stroke="none"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Text
              strokeWidth="0"
              fill={textColor}
              fontSize="40"
              textAnchor="middle"
              alignmentBaseline="middle"
              x="50"
              y="50"
            >
              {roundCountdown}
            </Text>
            <Circle
              cx="50"
              cy="50"
              r="45"
              strokeWidth="3"
              stroke={colors.buttonBackground.gray}
            />
            <Path
              strokeDasharray={`${animateCircle()} 283`}
              d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0"
              strokeWidth="3"
              strokeLinecap="round"
              // transform="rotate(90deg)"
              stroke={circleColor}
              style={{ transform: [{ rotateX: '90deg' }] }}
            />
          </G>
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circleTimer: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
