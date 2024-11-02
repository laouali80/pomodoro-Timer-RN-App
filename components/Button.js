import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

export default function Button({ title, onPress }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles.circle,
        title === 'Start'
          ? styles.startBtn
          : title === 'Reset'
          ? styles.resetBtn
          : title === 'Pause'
          ? styles.stopBtn
          : styles.resumeBtn,
      ]}
      onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  circle: {
    borderRadius: 100,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    width: 80,
    height: 80,
  },
  resetBtn: {
    backgroundColor: '#06B6D4',
  },
  startBtn: {
    backgroundColor: '#22C55E',
  },
  stopBtn: {
    backgroundColor: '#EF4444',
  },
  resumeBtn: {
    backgroundColor: '#FB923C',
  },
});
