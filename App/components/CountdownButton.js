import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function CountdownButton({
  text,
  onPress,
  color,
  backgroundColor,
  disabled,
}) {
  let textStyle = null;
  if (disabled) {
    textStyle = [styles.buttonText, { color: colors.text.gray }];
  } else {
    textStyle = [styles.buttonText, { color }];
  }

  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, { backgroundColor }]}
      disabled={disabled}
    >
      <Text style={textStyle}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 100,
    margin: 10,
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
  },
});
