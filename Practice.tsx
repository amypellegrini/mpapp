import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function Practice({entryTitle}) {
  const startTime = Date.now();

  const [seconds, setSeconds] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);

      if (elapsedSeconds > seconds) {
        setSeconds(elapsedSeconds);
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.entryTitle}>{entryTitle}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.timeDisplay}>{formatTime(seconds)}</Text>
      </View>
      <View style={styles.footer}>
        <Text>Controls</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  body: {
    justifyContent: 'center',
    height: '60%',
  },
  header: {
    height: '20%',
    justifyContent: 'center',
  },
  footer: {
    height: '20%',
    justifyContent: 'center',
  },
  entryTitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
  timeDisplay: {
    marginTop: -15,
    fontSize: 64,
    fontWeight: '300',
    textAlign: 'center',
  },
});

export default Practice;
