import { Text, SafeAreaView, StyleSheet, View, Vibration } from 'react-native';
import React, { useState } from 'react';

// or any files within the Snack
import Input from './components/Input';
import Button from './components/Button';
import TimerCountDownDisplay from './components/TimerCountDownDisplay';


export default function App() {
  const [timerInterval, setTimerInterval] = useState(null);
  const [timers, setTimers] = useState({
    workTime: {
      minutes: '00',
      seconds: '05',
    },
    breakTime: {
      minutes: '00',
      seconds: '08',
    },
  });
  const [counters, setCounters] = useState({
    workTime: { ...timers.workTime, isRunning: true },
    breakTime: { ...timers.breakTime, isRunning: false },
  });
  const [btns, setBtns] = useState({
    btn1: {
      title: 'Reset',
    },
    btn2: {
      title: 'Start',
    },
  });

  // Update function to handle changes for both `timers` and `counters`
  const handleTimerChange = (type, field, value) => {
    setTimers((prevTimers) => ({
      ...prevTimers,
      [type]: {
        ...prevTimers[type],
        [field]: value,
      },
    }));

    setCounters((prevCounters) => ({
      ...prevCounters,
      [type]: {
        ...prevCounters[type],
        [field]: value,
      },
    }));
  };

  const workingInputs = [
    {
      placeholder: 'mins',
      value: timers.workTime.minutes,
      onChange: (num) => handleTimerChange('workTime', 'minutes', num),
    },
    {
      placeholder: 'secs',
      value: timers.workTime.seconds,
      onChange: (num) => handleTimerChange('workTime', 'seconds', num),
    },
  ];

  const breakInputs = [
    {
      placeholder: 'mins',
      value: timers.breakTime.minutes,

      onChange: (num) => handleTimerChange('breakTime', 'minutes', num),
    },
    {
      placeholder: 'secs',
      value: timers.breakTime.seconds,
      onChange: (num) => handleTimerChange('breakTime', 'seconds', num),
    },
  ];

  const toggleResetTimer = () => {
    setBtns({
      ...btns,
      btn2: { title: 'Start' },
    });
    if (timerInterval != null) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setCounters({
      workTime: { ...timers.workTime, isRunning: true },
      breakTime: { ...timers.breakTime, isRunning: false },
    });
  };

  const toggleStartTimer = () => {
    setBtns({
      ...btns,
      btn2: { title: 'Pause' },
    });
    const id = setInterval(() => {
      timerCountDown();
    }, 1000);
    setTimerInterval(id);
  };
  const toggleStopTimer = () => {
    setBtns({
      ...btns,
      btn2: { title: 'Resume' },
    });
    if (timerInterval != null) {
      clearInterval(timerInterval);
    }
  };

  const timerCountDown = () => {
    const updateTimer = (type) => {
      setCounters((prevCounters) => {
        let minutes = Number(prevCounters[type].minutes);
        let seconds = Number(prevCounters[type].seconds);

        if (seconds === 0) {
          if (minutes > 0) {
            minutes -= 1;
            seconds = 59;
          } else {
            // vibrate
            Vibration.vibrate();
            // Switch timer state when countdown reaches zero and reset the counter
            const nextType = type === 'workTime' ? 'breakTime' : 'workTime';

            // Reset current timer and switch to the other
            return {
              [type]: { ...timers[type], isRunning: false },
              [nextType]: { ...timers[nextType], isRunning: true },
            };
          }
        } else {
          seconds -= 1;
        }

        return {
          ...prevCounters,
          [type]: {
            ...prevCounters[type],
            minutes: minutes.toString().padStart(2, '0'),
            seconds: seconds.toString().padStart(2, '0'),
          },
        };
      });
    };

    // Check which timer is running and update accordingly
    setCounters((currentCounters) => {
      if (currentCounters.workTime.isRunning) {
        updateTimer('workTime');
      } else {
        updateTimer('breakTime');
      }
      return currentCounters;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>Work Timer</Text>

      <View style={[styles.rowDirection, styles.flexJustifyContentCenter]}>
        {workingInputs.map((input) => (
          <Input
            placeholder={input.placeholder}
            value={input.value}
            onChange={input.onChange}
          />
        ))}
      </View>

      <Text style={styles.paragraph}>Break Timer</Text>
      <View style={[styles.rowDirection, styles.flexJustifyContentCenter]}>
        {breakInputs.map((input) => (
          <Input
            placeholder={input.placeholder}
            value={input.value}
            onChange={input.onChange}
          />
        ))}
      </View>
      <View style={[styles.rowDirection, styles.flexJustifyContentAround]}>
        <Button title={btns.btn1.title} onPress={toggleResetTimer} />
        <Button
          title={btns.btn2.title}
          onPress={
            btns.btn2.title === 'Pause' ? toggleStopTimer : toggleStartTimer
          }
        />
      </View>
      <TimerCountDownDisplay
        title={counters.workTime.isRunning ? 'Work' : 'Break'}
        minutes={
          counters.workTime.isRunning
            ? counters.workTime.minutes
            : counters.breakTime.minutes
        }
        seconds={
          counters.workTime.isRunning
            ? counters.workTime.seconds
            : counters.breakTime.seconds
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

  paragraph: {
    // margin: 24,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rowDirection: {
    flexDirection: 'row',
  },

  flexJustifyContentAround: {
    justifyContent: 'space-around',
  },
  flexJustifyContentCenter: {
    justifyContent: 'center',
  },
});
