import React, {useEffect} from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';

import Container from './components/container';
import {ButtonLeft, ButtonRight} from './components/button/Button';

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const hoursString = hours > 0 ? `${hours.toString().padStart(2, '0')}:` : '';

  return `${hoursString}${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}

function Practice({entryTitle, componentId}) {
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
    <Container>
      <View style={styles.header}>
        <Text style={styles.entryTitle}>{entryTitle}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.timeDisplay}>{formatTime(seconds)}</Text>
      </View>
      <View style={styles.footer}>
        <ButtonLeft title="Pause" onPress={() => {}} />
        <ButtonRight
          title="Stop"
          onPress={() => {
            Navigation.push(componentId, {
              component: {
                name: 'com.myApp.PracticeSummary',
                passProps: {
                  entryTitle: entryTitle,
                  duration: seconds,
                },
              },
            });
          }}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  body: {},
  header: {},
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  entryTitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    color: '#EFEFEF',
  },
  timeDisplay: {
    marginTop: -15,
    fontSize: 64,
    fontWeight: '300',
    textAlign: 'center',
    color: '#EFEFEF',
  },
});

export default Practice;
