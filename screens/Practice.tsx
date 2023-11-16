import React, {useEffect} from 'react';

import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import {Navigation, NavigationProps} from 'react-native-navigation';

import Container from './components/container';
import {ButtonLeft, ButtonRight} from './components/button/Button';
import Title from './components/title';
import commonStyles from './components/commonStyles';
import formatTime from './components/utils/formatTime';
import H2 from './components/Typography/H2';

interface PracticeProps extends NavigationProps {
  entryTitle: string;
  bpm?: number;
}

function Practice({entryTitle, bpm, componentId}: PracticeProps) {
  const isDarkMode = useColorScheme() === 'dark';
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
      <View style={commonStyles.pt10}>
        <Title style={commonStyles.textCenter}>{entryTitle}</Title>
        {bpm && <H2 style={commonStyles.textCenter}>{bpm} bpm</H2>}
      </View>
      <View style={styles.body}>
        <Text
          style={[
            styles.timeDisplay,
            {
              color: isDarkMode ? '#EFEFEF' : '#202020',
            },
          ]}>
          {formatTime(seconds)}
        </Text>
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
                  bpm: bpm,
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
