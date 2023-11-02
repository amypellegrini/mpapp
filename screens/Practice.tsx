import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Container from './components/container/Container';

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
        <Pressable style={[styles.button, styles.buttonLeft]}>
          <Text style={styles.buttonLabel}>Pause</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonRight]}
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
          }}>
          <Text style={styles.buttonLabel}>Stop</Text>
        </Pressable>
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
    // width: '100%',
  },
  button: {
    margin: 6,
    borderRadius: 4,
    height: 60,
    flex: 1,
    backgroundColor: '#DDDDDD',
  },
  buttonLeft: {
    marginRight: 1,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  buttonRight: {
    marginLeft: 1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  buttonLabel: {
    textTransform: 'uppercase',
    fontWeight: '500',
    fontSize: 20,
    height: 60,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#222222',
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
