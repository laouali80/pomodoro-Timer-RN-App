import { StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';

type Props = {
  minutes:any,
  seconds:any,
  title:any
}

const TimerCountDownDisplay: React.FC<Props> = ({ minutes, seconds, title }) => {
  // console.log("minutes", minutes)
  // console.log("seconds: ",seconds)
  
  return (
    <>
      <Text style={styles.paragraph}>{title} Time</Text>
      <Text style={styles.paragraph}>
        {minutes} : {seconds}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    // margin: 24,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


export default TimerCountDownDisplay